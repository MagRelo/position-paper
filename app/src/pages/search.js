import React, { useState, useEffect } from 'react';

import { useDebounce } from 'components/util/random';

import SearchResults from 'components/searchResult';

import JobSearchForm from 'networkData/searchForm';

function SearchFlow() {
  // search data
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 333);
  useEffect(
    () => {
      setIsSearching(true);
      getSearchResults(debouncedSearchTerm).then(results => {
        setResults(results);
        setIsSearching(false);
      });
    },
    [debouncedSearchTerm]
  );

  function submit(queryObject) {
    setSearchTerm(queryObject);
  }

  return (
    <div>
      <h3 className="section-header">Search</h3>

      <JobSearchForm submit={submit} />

      <SearchResults results={results} />
    </div>
  );
}

export default SearchFlow;

async function getSearchResults(searchTerm, days) {
  const queryString = `?searchTerm=${searchTerm}&days=${days}`;
  return await fetch('/api/search' + queryString, {
    method: 'GET'
  })
    .then(r => r.json())
    .catch(error => {
      console.error(error);
      return [];
    });
}
