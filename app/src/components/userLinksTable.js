import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class Inbox extends Component {
  render() {
    return (
      <table className="pure-table">
        <thead>
          <tr>
            <th>Query</th>
            <th>Value</th>
            <th>Views</th>
            <th>Child Links</th>
          </tr>
        </thead>
        <tbody>
          {this.props.links.map(link => {
            return (
              <tr key={link._id}>
                <td>
                  <Link to={'/link/' + link.linkId}>{link.query.title}</Link>
                </td>
                <td>{formatCurrency(link.payoffs[link.generation])}</td>
                <td>{link.views}</td>
                <td>{link.children.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inbox);
