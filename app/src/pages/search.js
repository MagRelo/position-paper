// import React from 'react';
import React, { useState, useEffect } from 'react';
import { useDebounce } from 'components/random';
// import { Helmet } from 'react-helmet';

// import JobSearchForm from 'networkData/searchForm';
import SearchResults from 'networkData/searchResult_tile';

function SearchFlow() {
  // search data
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 333);
  useEffect(() => {
    setIsSearching(true);
    getSearchResults(debouncedSearchTerm).then(results => {
      setResults(results);
      setIsSearching(false);
    });
  }, [debouncedSearchTerm]);

  // function toggleForm() {
  //   setIsOpen(!isOpen);
  // }

  // function submit(queryObject) {
  //   setSearchTerm(queryObject);
  // }

  return (
    <div className="page-container">
      <div className="container">
        <h1>
          Search
          {/* <button
            className="btn btn-theme btn-sm"
            style={{ float: 'right', fontSize: 'small' }}
            onClick={() => {
              toggleForm();
            }}
          >
            {isOpen ? 'Close' : 'Filter'}
          </button> */}
        </h1>
        {/* 
        {isOpen ? (
          <div style={{ marginBottom: '2em' }}>
            <JobSearchForm submit={submit} />
          </div>
        ) : null} */}

        <SearchResults results={results} />
      </div>
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

// <MetaData />
// function MetaData() {
//   return (
//     <Helmet>
//       <title>Talent Relay | Search</title>
//       <meta name="description" content="Talent Relay – Search for Links" />
//       <link rel="canonical" href={'https://talent.incentive.exchange/search'} />

//       <meta property="og:site_name" content="Talent Relay" />
//       <meta property="og:type" content="website" />
//       <meta
//         property="og:url"
//         content={'https://talent.incentive.exchange/search'}
//       />
//       <meta property="og:title" content="Talent Relay | Search" />
//       <meta
//         property="og:description"
//         content="Talent Relay – Search for Links"
//       />

//       {/* <meta property="og:image" content="" /> */}
//       {/* <meta property="og:image:secure_url" content="" /> */}
//       {/* <meta property="og:image:type" content="jpeg" /> */}
//       {/* <meta property="og:image:height" content="606" /> */}
//       {/* <meta property="og:image:width" content="808" /> */}

//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:site" content="@spoonuniversity" />
//       <meta name="twitter:title" content="Talent Relay | Search" />
//       <meta
//         name="twitter:description"
//         content="Talent Relay – Search for Links"
//       />
//       {/* <meta name="twitter:image" content="" /> */}
//     </Helmet>
//   );
// }
