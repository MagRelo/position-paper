import React from 'react';

import { formatCurrency } from 'components/util/random';

export function UserQueryTable(props) {
  return (
    <React.Fragment>
      <table className="pure-table">
        <thead>
          <tr>
            <th>Query</th>
            <th>Target</th>
            <th>Network</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.queries.length
            ? props.queries.map(query => {
                return (
                  <tr key={query._id}>
                    <td>{query.title}</td>
                    <td>{formatCurrency(query.target_bonus)}</td>
                    <td>{formatCurrency(query.network_bonus)}</td>
                    <td>{query.status}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>

      {props.queries.length ? null : (
        <div style={{ textAlign: 'center', margin: '1em 0' }}>
          <i>No queries...</i>
        </div>
      )}
    </React.Fragment>
  );
}

export default UserQueryTable;
