import React, { Component } from 'react';
import { Link } from '@reach/router';

function formatCurrency(input) {
  if (typeof input === 'number') {
    return input.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }
  return '';
}

class UserLinks extends Component {
  render() {
    return (
      <React.Fragment>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Earn Up To...</th>
              <th>Applications</th>
              <th>Promoters</th>
            </tr>
          </thead>
          <tbody>
            {this.props.links.map(link => {
              return (
                <tr key={link._id}>
                  <td>
                    <Link to={'/link/' + link.linkId}>{link.title}</Link>
                  </td>
                  <td>{formatCurrency(link.payoffs[link.generation])}</td>
                  <td>{link.views || '0*'}</td>
                  <td>{link.views || '0*'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {this.props.links.length ? null : (
          <div style={{ textAlign: 'center', margin: '1em 0' }}>
            <i>No active promotions...</i>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default UserLinks;
