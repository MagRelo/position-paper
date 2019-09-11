import React, { useState, useEffect } from 'react';
import { useDebounce } from 'components/util/random';
import { Helmet } from 'react-helmet';

import JobSearchForm from 'networkData/searchForm';
// import SearchResults from 'networkData/searchResult';
import SearchResults from 'networkData/searchResult_tile';

function SearchFlow() {
  // search data
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  // const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  function toggleForm() {
    setIsOpen(!isOpen);
  }

  function submit(queryObject) {
    setSearchTerm(queryObject);
  }

  return (
    <div>
      <MetaData />
      <h3 className="section-header">
        Search
        <button
          className="pure-button pure-button-primary"
          style={{ float: 'right', fontSize: 'small' }}
          onClick={() => {
            toggleForm();
          }}
        >
          {isOpen ? 'Close' : 'Filter'}
        </button>
      </h3>

      {isOpen ? (
        <div style={{ marginBottom: '2em' }}>
          <JobSearchForm submit={submit} />
        </div>
      ) : null}

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

function MetaData() {
  return (
    <Helmet>
      <title>Incentive Exchange | Search</title>
      <meta
        name="description"
        content="Incentive Exchange – Search for Links"
      />
      <link rel="canonical" href={'https://incentive.exchange/search'} />

      <meta property="og:site_name" content="Incentive Exchange" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={'https://incentive.exchange/search'} />
      <meta property="og:title" content="Incentive Exchange | Search" />
      <meta
        property="og:description"
        content="Incentive Exchange – Search for Links"
      />

      {/* <meta property="og:image" content="" /> */}
      {/* <meta property="og:image:secure_url" content="" /> */}
      {/* <meta property="og:image:type" content="jpeg" /> */}
      {/* <meta property="og:image:height" content="606" /> */}
      {/* <meta property="og:image:width" content="808" /> */}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@spoonuniversity" />
      <meta name="twitter:title" content="Incentive Exchange | Search" />
      <meta
        name="twitter:description"
        content="Incentive Exchange – Search for Links"
      />
      {/* <meta name="twitter:image" content="" /> */}
    </Helmet>
  );
}
