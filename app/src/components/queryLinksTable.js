import React, { Component } from 'react';

class QueryLinkTable extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.links.length ? (
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
              {this.props.links &&
                this.props.links.map(link => {
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
        ) : (
          <div style={{ textAlign: 'center', margin: '1em 0' }}>
            <i>No child links...</i>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default QueryLinkTable;
