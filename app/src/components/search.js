import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { formatCurrency, formatDate } from 'components/util/random';
import StreamList from './userStream';
import FollowButton from 'components/followButton';

import { useTrail, animated } from 'react-spring';
// const trail = useTrail(number, {opacity: 1})
const config = { mass: 5, tension: 2000, friction: 200 };
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
  useEffect(() => {
    getUser().then(user => {
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
    <React.Fragment>
      <div className="row row-5-3">
        <div>
          <h3 className="section-header">Deal Flow</h3>

          <div className="row row-2" style={{ paddingTop: '1em' }}>
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

          {isSearching ? (
            <div style={{ textAlign: 'center', marginTop: '1em' }}>
              Loading...
            </div>
          ) : null}

          <ul style={{ padding: '0' }}>
            {results.map(item => {
              return (
                <li key={item._id} style={{ listStyle: 'none' }}>
                  {DealPanel(item)}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h3 className="section-header">Your Activity</h3>
          <StreamList stream={stream} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default SearchFlow;

function DealPanel(link) {
  return (
    <div
      style={{
        background: 'rgb(196, 218, 248)',
        borderRadius: '4px',
        padding: '0.677em',
        border: 'solid 1px #9cc0fb'
      }}
    >
      <div
        className="panel"
        style={{
          background: 'white',
          boxShadow: '0px 1px 4px 0px rgba(87, 103, 115, 0.58)'
        }}
      >
        {/* Title */}
        <p style={{ fontSize: '20px', marginTop: '0' }}>
          <span style={{ float: 'right', fontSize: 'smaller' }}>
            {formatCurrency(link.query.bonus)}
          </span>
          <Link to={'/link/' + link.linkId}> {link.query.title}</Link>
          <FollowButton type="Query" targetId={link.query._id} />
        </p>

        {/* Description */}
        <p>{link.query.data.description}</p>

        <div className="row row-x-2">
          <p>Posted: {formatDate(link.createdAt)}</p>
          <p>
            Posted By: {link.user.email}
            <FollowButton type="User" targetId={link.user._id} />
          </p>
        </div>

        <p>Bonus: {formatCurrency(link.query.bonus)} </p>
        <p>Generation: {link.generation} </p>
        <div
          style={{
            textAlign: 'right',
            marginTop: '0.667em'
          }}
        >
          <button
            className="pure-button pure-button-primary"
            style={{ background: '#0fa51d' }}
          >
            Promote for {formatCurrency(link.payoffs[link.generation])}
          </button>
        </div>
      </div>
    </div>
  );
}

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

async function follow(type, id) {
  const queryString = `?type=${type}&id=${id}`;

  return await fetch('/api/user/follow' + queryString, {
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
