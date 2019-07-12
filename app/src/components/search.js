import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDebounce } from 'components/util/random';

import SearchResults from 'components/searchResult';

// import { useTrail, animated } from 'react-spring';
// const trail = useTrail(number, {opacity: 1})
// const config = { mass: 5, tension: 2000, friction: 200 };
// const trail = useTrail(results.length, {
//   config,
//   opacity: toggle ? 1 : 0,
//   x: toggle ? 0 : 20,
//   height: toggle ? 80 : 0,
//   from: { opacity: 0, x: 20, height: 0 }
// });

function SearchFlow() {
  // stream data
  const [stream, setStream] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    getUser().then(user => {
      setUser(user);
      setStream(user.stream);
    });
  }, []);

  // search data
  const [days, setDays] = useState('1');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 333);
  useEffect(
    () => {
      setIsSearching(true);
      getSearchResults(debouncedSearchTerm, days).then(results => {
        setResults(results.slice(0, 19));
        setIsSearching(false);
      });
    },
    [debouncedSearchTerm, days]
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

        <div className="row row-3">
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
        </div>
      </div>

      <div>
        {isSearching ? (
          <div style={{ textAlign: 'center', marginTop: '1em' }}>
            Loading...
          </div>
        ) : null}
      </div>

      <SearchResults results={results} userId={user._id} />
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

async function getUser() {
  return await fetch('/api/user', {
    method: 'GET'
  })
    .then(r => r.json())
    .catch(error => {
      console.error(error);
      return {};
    });
}
