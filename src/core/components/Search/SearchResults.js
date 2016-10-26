import classNames from 'classnames';
import React, { PropTypes } from 'react';

import translate from 'core/i18n/translate';

import 'core/css/SearchResults.scss';

import SearchResult from './SearchResult';


class SearchResults extends React.Component {
  static propTypes = {
    CategoryInfoComponent: PropTypes.object.isRequired,
    ResultComponent: PropTypes.object.isRequired,
    category: PropTypes.string,
    count: PropTypes.number,
    i18n: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    query: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.object),
    type: PropTypes.string,
  }

  static defaultProps = {
    CategoryInfoComponent: null,
    ResultComponent: SearchResult,
    category: undefined,
    count: 0,
    query: undefined,
    results: [],
  }

  render() {
    const { CategoryInfoComponent, ResultComponent, addonType, category, count,
            i18n, lang, loading, query, results } = this.props;

    const searchParamIsPresent = [category, query].filter((param) => {
      return param !== undefined && param.length;
    }).length ? true : false;

    let hideMessageText = false;
    let messageText;
    let resultHeader;
    let searchResults;

    if (category && category.length && CategoryInfoComponent) {
      resultHeader = <CategoryInfoComponent slug={category} />
    }

    if (searchParamIsPresent && count > 0) {
      hideMessageText = true;
      messageText = i18n.sprintf(
        i18n.ngettext(
          'Your search for "%(query)s" returned %(count)s result.',
          'Your search for "%(query)s" returned %(count)s results.',
          count,
        ),
        { query, count }
      );
      searchResults = (
        <ul className="SearchResults-list"
            ref={(ref) => { this.results = ref; }}>
          {results.map((result) => (
            <ResultComponent result={result} key={result.slug} lang={lang} />
          ))}
        </ul>
      );
    } else if (searchParamIsPresent && loading) {
      messageText = i18n.gettext('Searching...');
    } else if (!loading && query && count === 0) {
      messageText = i18n.sprintf(
        i18n.gettext('No results were found for "%(query)s".'), { query });
    } else if (!loading && searchParamIsPresent && count === 0) {
      // TODO: Add the extension type, if available, so it says "no extensions"
      // found that match your search or something.
      messageText = i18n.gettext('No results were found.');
    } else if (!searchParamIsPresent && !loading) {
      messageText = i18n.gettext(
        "Please enter search terms to search all of Mozilla's Add-ons.");
    }

    const message = (
      <p ref={(ref) => { this.message = ref; }} className={classNames({
        'visually-hidden': hideMessageText,
        'SearchReuslts-message': !hideMessageText,
      })}>{messageText}</p>
    );

    return (
      <div ref={(ref) => { this.container = ref; }} className="SearchResults">
        {message}
        {resultHeader}
        {searchResults}
      </div>
    );
  }
}

export default translate({ withRef: true })(SearchResults);
