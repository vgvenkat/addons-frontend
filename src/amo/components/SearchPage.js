import React, { PropTypes } from 'react';

import Paginate from 'core/components/Paginate';
import SearchResults from 'core/components/Search/SearchResults';

import CategoryInfo from './CategoryInfo';
import SearchResult from './SearchResult';


export default class SearchPage extends React.Component {
  static propTypes = {
    CategoryInfoComponent: PropTypes.node.isRequired,
    ResultComponent: PropTypes.node.isRequired,
    addonType: PropTypes.string.isRequired,
    application: PropTypes.string.isRequired,
    category: PropTypes.string,
    count: PropTypes.number,
    lang: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    page: PropTypes.number,
    results: PropTypes.array,
    query: PropTypes.string,
  }

  static defaultProps = {
    CategoryInfoComponent: CategoryInfo,
    ResultComponent: SearchResult,
    application: 'firefox',
  }

  render() {
    const {
      CategoryInfoComponent, ResultComponent, application, addonType,
      category, count, lang, loading, page, query, results,
    } = this.props;
    const pathname = `/${lang}/${application}/search/`;
    const paginator = query && count > 0 ?
      <Paginate count={count} pathname={pathname} query={{ q: query }}
        currentPage={page} showPages={0} /> : [];
    return (
      <div className="search-page">
        <SearchResults CategoryInfoComponent={CategoryInfoComponent}
          ResultComponent={ResultComponent} addonType={addonType}
          application={application} category={category} count={count}
          lang={lang} loading={loading} page={page} results={results}
          query={query} />
        {paginator}
      </div>
    );
  }
}
