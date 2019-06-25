import React, { Component } from 'react';

class QueryResponseTable extends Component {
  render() {
    return (
      <table className="pure-table">
        <thead>
          <tr>
            <th>Query</th>
            <th>From</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {this.props.responses.map(response => {
            return (
              <tr key={response._id}>
                <td>{response.query.title}</td>
                <td>{response.respondingUser}</td>
                <td>{response.message}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default QueryResponseTable;
