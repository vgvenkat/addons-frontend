import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import { search } from 'core/api';
import { searchStart, searchLoad, searchFail } from 'core/actions/search';

export function mapStateToProps(state, ownProps) {
  const { location } = ownProps;
  const lang = state.api.lang;

  let doingSearch = ['category'].filter((param) => {
    return (location.query[param] !== undefined &&
      location.query[param] === state.search[param]);
  }).length ? true : false;

  if (location.query.q !== undefined &&
    location.query.q === state.search.query
  ) {
    doingSearch = true;
  }

  if (doingSearch) {
    return { lang, ...state.search };
  }

  return { lang };
}

function performSearch({
  dispatch, page, api, auth = false, addonType, category, query,
}) {
  // If none of the optional search params are found, we aren't searching for
  if ([addonType, category, query].filter((param) => {
    return param !== undefined && param.length;
  }).length === 0) {
    return Promise.resolve();
  }

  dispatch(searchStart({ page, addonType, category, query }));
  return search({ page, api, auth, addonType, category, query })
    .then((response) => {
      return dispatch(searchLoad({
        page,
        addonType,
        category,
        query,
        ...response,
      }));
    })
    .catch(() => {
      return dispatch(searchFail({ page, addonType, category, query }));
    });
}

export function isLoaded({ page, query, addonType, category, state }) {
  return state.query === query && state.page === page &&
    state.addonType === addonType && state.category === category &&
    !state.loading;
}

export function parsePage(page) {
  const parsed = parseInt(page, 10);
  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
}

export function loadSearchResultsIfNeeded({ store: { dispatch, getState }, location }) {
  const addonType = location.query.type;
  const category = location.query.category;
  const query = location.query.q;
  const page = parsePage(location.query.page);
  const state = getState();
  if (!isLoaded({ state: state.search, query, page, addonType, category
    })) {
    return performSearch({ dispatch, page, api: state.api, auth: state.auth,
      addonType, category, query });
  }
  return true;
}

export default function createSearchPage(SearchPageComponent) {
  return asyncConnect([{
    deferred: true,
    promise: loadSearchResultsIfNeeded,
  }])(connect(mapStateToProps)(SearchPageComponent));
}
