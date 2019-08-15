import React, { useState, useEffect } from 'react';

import { useDebounce } from 'components/util/random';

import SearchResults from 'components/searchResult';

function SearchFlow() {
  // search data
  // const [days, setDays] = useState('1');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  // const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 333);
  useEffect(
    () => {
      // setIsSearching(true);
      getSearchResults(debouncedSearchTerm).then(results => {
        setResults(results);
        // setIsSearching(false);
      });
    },
    [debouncedSearchTerm]
  );

  return (
    <div>
      <h3 className="section-header">Search</h3>

      {/* Seach Form */}
      <div
        className="row row-2"
        style={{ paddingTop: '1em', marginBottom: '1em' }}
      >
        <div>
          <form action="" className="pure-form">
            <input
              type="text"
              className="pure-input-1"
              placeholder="type to search"
              onChange={e => {
                setSearchTerm(e.target.value);
              }}
            />
          </form>
        </div>

        {/* <div className="row row-3">
          <div>
            <button
              className="pure-button pure-button-primary"
              style={{
                textDecoration: days === '1' ? 'underline' : null
              }}
              onClick={() => {
                setDays('1');
              }}
            >
              24 hours
            </button>
          </div>
          <div>
            <button
              className="pure-button pure-button-primary"
              style={{
                textDecoration: days === '7' ? 'underline' : null
              }}
              onClick={() => {
                setDays('7');
              }}
            >
              This Week
            </button>
          </div>
          <div>
            <button
              className="pure-button pure-button-primary"
              style={{
                textDecoration: days === '30' ? 'underline' : null
              }}
              onClick={() => {
                setDays('30');
              }}
            >
              This Month
            </button>
          </div>
        </div>*/}
      </div>

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
