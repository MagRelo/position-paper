import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Masonry from 'react-masonry-component';

import StreamList from './userStream';

function SearchFlow() {
  const [stream, setStream] = useState([]);

  // search stuff
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 333);

  // search effect
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        getData(debouncedSearchTerm).then(results => {
          setResults(results.slice(0, 19));
          setIsSearching(false);
        });
      }
    },
    [debouncedSearchTerm]
  );

  // stream data
  useEffect(() => {
    getUser().then(user => {
      setStream(user.stream);
    });
  }, []);

  return (
    <React.Fragment>
      <div className="row row-5-3">
        <div>
          <h3 className="section-header">Deal Flow</h3>
          <form action="" className="pure-form">
            <fieldset>
              <input
                type="text"
                className="pure-input-1"
                placeholder="type to search"
                onChange={e => {
                  setSearchTerm(e.target.value);
                }}
              />
            </fieldset>
          </form>

          {results.map(item => {
            return <div key={item._id}>{item._id}</div>;
          })}

          {isSearching ? (
            <div style={{ textAlign: 'center', marginTop: '1em' }}>
              Loading...
            </div>
          ) : null}
        </div>
        <div>
          <h3 className="section-header">Activity</h3>
          <StreamList stream={stream} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default SearchFlow;

async function getData(searchTerm) {
  return await fetch('/api/search?' + searchTerm, {
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

// Our hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Return a cleanup function that will be called every time ...
      // ... useEffect is re-called. useEffect will only be re-called ...
      // ... if value changes (see the inputs array below).
      // This is how we prevent debouncedValue from changing if value is ...
      // ... changed within the delay period. Timeout gets cleared and restarted.
      // To put it in context, if the user is typing within our app's ...
      // ... search box, we don't want the debouncedValue to update until ...
      // ... they've stopped typing for more than 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you ...
    // ... need to be able to change that dynamically.
    [value]
  );

  return debouncedValue;
}
