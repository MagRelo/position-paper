import React from 'react';

import { Link } from '@reach/router';

import { formatDate } from 'components/util/random';

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
                  <Link to={'/link/' + response.link.linkId + '#apply'}>
                    {response.link.title}
                  </Link>
                </td>
                <td>{formatDate(response.createdAt)}</td>
                <td>{response.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {props.responses.length ? null : (
        <div style={{ textAlign: 'center', margin: '1em 0' }}>
          <i>No applications...</i>
        </div>
      )}
    </React.Fragment>
  );
}
