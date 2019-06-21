import React, { Component } from 'react';

class QueryLinkTable extends Component {
  render() {
    return (
      <table className="pure-table">
        <thead>
          <tr>
            <th>Generation</th>
            <th>Payoff</th>
            <th>Children</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          {this.props.links.map(link => {
            return (
              <tr key={link._id}>
                <td>{link.generation}</td>
                <td>{link.payoff}</td>
                <td>{link.children.length}</td>
                <td>{link.views}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default QueryLinkTable;
