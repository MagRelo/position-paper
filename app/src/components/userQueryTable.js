import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function formatCurrency(input) {
  if (typeof input === 'number') {
    return input.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }
  return '';
}

class UserQueryTable extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.queries.length ? (
          <table className="pure-table">
            <thead>
              <tr>
                <th>Request</th>
                <th>Bonus</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {this.props.queries.map(query => {
                return (
                  <tr key={query._id}>
                    <td>
                      <Link to={'/query/' + query.links[0].linkId}>
                        {query.title}
                      </Link>
                    </td>
                    <td>{formatCurrency(query.bonus)}</td>
                    <td>{query.totalViews}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: 'center', margin: '1em 0' }}>
            <i>No active queries...</i>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default UserQueryTable;
