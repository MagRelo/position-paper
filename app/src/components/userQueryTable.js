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
      <table className="pure-table">
        <thead>
          <tr>
            <th>Query</th>
            <th>Bonus</th>
            <th>Links</th>
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
                <td>{query.links.length}</td>
                <td>{query.totalViews}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default UserQueryTable;
