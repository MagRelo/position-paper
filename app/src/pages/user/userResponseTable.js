import React from 'react';

import { Link } from '@reach/router';

export default PaymentTable;

export function PaymentTable(props) {
  return (
    <React.Fragment>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Submitted</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.responses.map(response => {
            return (
              <tr key={response._id}>
                <td>
                  <Link to={'/response/' + response._id}>
                    {response.link.title}
                  </Link>
                </td>
                <td>{response.createdAt}</td>
                <td>{response.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {props.responses.length ? null : (
        <div style={{ textAlign: 'center', margin: '1em 0' }}>
          <i>No responses...</i>
        </div>
      )}

      <Link
        to="/search"
        className="btn btn-theme btn-sm"
        style={{ float: 'right', marginTop: '1.5em' }}
      >
        Search for Jobs
      </Link>
    </React.Fragment>
  );
}
