import React from 'react';

import { formatCurrency, formatDate } from 'components/util/random';

export default PaymentTable;

export function PaymentTable(props) {
  return (
    <React.Fragment>
      {props.payments.length ? (
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
                  <td>{payment.link.title}</td>
                  <td>{formatCurrency(payment.amount / 100)}</td>
                  <td>{payment.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: 'center', margin: '1em 0' }}>
          <i>No payments...</i>
        </div>
      )}
    </React.Fragment>
  );
}
