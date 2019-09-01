import React, { Component } from 'react';
import { Link } from '@reach/router';

class JobTable extends Component {
  render() {
    return (
      <React.Fragment>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Views</th>
              <th>Shares</th>
              <th>Child Links</th>
            </tr>
          </thead>
          <tbody>
            {this.props.links.map(link => {
              return (
                <tr key={link._id}>
                  <td>
                    <Link to={'/link/' + link.linkId}>{link.title}</Link>
                  </td>
                  <td>{link.views}</td>
                  <td>{link.shares}</td>
                  <td>{link.children.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {this.props.links.length ? null : (
          <div style={{ textAlign: 'center', margin: '1em 0' }}>
            <i>No active jobs...</i>
          </div>
        )}

        <div>
          <Link
            to="/addquery"
            className="pure-button pure-button-primary"
            style={{ float: 'right', marginTop: '1.5em' }}
          >
            Post a Job
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default JobTable;
