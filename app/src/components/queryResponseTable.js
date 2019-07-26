import React from 'react';
import { Link } from 'react-router-dom';

export default QueryList;

export function QueryList(props) {
  return (
    <React.Fragment>
      {props.responses.length ? (
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {props.responses.map(response => {
            return (
              <li key={response._id}>
                <div className="panel">
                  {response.respondingUser.email}
                  <Link to={'/response/' + response._id}>View</Link>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div style={{ textAlign: 'center', margin: '1em 0' }}>
          <i>No responses...</i>
        </div>
      )}
    </React.Fragment>
  );
}
