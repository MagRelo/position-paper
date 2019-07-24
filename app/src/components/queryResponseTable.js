import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class QueryResponseTable extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.responses.length ? (
          <table className="pure-table">
            <thead>
              <tr>
                <th>From</th>
                <th>Message</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {this.props.responses.map(response => {
                return (
                  <tr key={response._id}>
                    <td>{response.respondingUser}</td>
                    <td> {response.message}</td>
                    <td>
                      <Link to={'/response/' + response._id}>View</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: 'center', margin: '1em 0' }}>
            <i>No responses...</i>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default QueryResponseTable;
