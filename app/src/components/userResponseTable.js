import React from 'react';

import { Link } from 'react-router-dom';

export default PaymentTable;

export function PaymentTable(props) {
  return (
    <React.Fragment>
      <table className="pure-table">
        <thead>
          <tr>
            <th>Link</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {props.responses.map(response => {
            return (
              <tr key={response._id}>
                <td>
                  <Link to={'/response/' + response._id}>
                    {response.originLink.title}
                  </Link>
                </td>
                <td>{response.message}</td>
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
    </React.Fragment>
  );
}
