import React, { Component } from 'react';

class QueryLinkTable extends Component {
  render() {
    return (
      <table className="pure-table">
        <thead>
          <tr>
            <th>Generation</th>
            <th>Bonus</th>
            <th>Children</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          {this.props.links.map(link => {
            return (
              <tr key={link._id}>
                <td>{link.generation}</td>
                <td>{link.payoffs[0]}</td>
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
