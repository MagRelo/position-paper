import React from 'react';

import { Link } from '@reach/router';

import { formatDate } from 'components/random';

export default PaymentTable;

export function PaymentTable({ responses }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Submitted</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {responses.map(response => {
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
  );
}
