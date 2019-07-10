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
      <React.Fragment>
        {this.props.links.length ? (
          <table className="pure-table">
            <thead>
              <tr>
                <th>Link</th>
                <th>Value</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {this.props.links.map(link => {
                return (
                  <tr key={link._id}>
                    <td>
                      <Link to={'/link/' + link.linkId}>
                        {link.query.title}
                      </Link>
                    </td>
                    <td>{formatCurrency(link.payoffs[link.generation])}</td>
                    <td>{link.views}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: 'center', margin: '1em 0' }}>
            <i>No active links...</i>
          </div>
        )}
      </React.Fragment>
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
