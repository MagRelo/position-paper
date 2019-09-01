import React from 'react';
import { Link } from '@reach/router';

import { formatCurrency, formatDate } from 'components/util/random';

export default PaymentTable;

export function PaymentTable(props) {
  return (
    <React.Fragment>
      <table className="pure-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Link</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.payments.map(payment => {
            return (
              <tr key={payment._id}>
                <td>{formatDate(payment.createdAt)}</td>
                <td>
                  <Link to={'/link/' + payment.link.linkId}>
                    {payment.link.title}
                  </Link>
                </td>
                <td>{formatCurrency(payment.amount / 100)}</td>
                <td>{payment.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {props.payments.length ? null : (
        <div style={{ textAlign: 'center', margin: '1em 0' }}>
          <i>No payments...</i>
        </div>
      )}
    </React.Fragment>
  );
}
