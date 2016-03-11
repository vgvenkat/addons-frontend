export function searchStart(query) {
  return {
    type: 'SEARCH_STARTED',
    payload: { query },
  };
}

export function searchLoad({ query, entities, result }) {
  return {
    type: 'SEARCH_LOADED',
    payload: { entities, query, result },
  };
}
