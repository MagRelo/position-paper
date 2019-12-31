import React, { Component } from 'react';
import { Link } from '@reach/router';

class JobTable extends Component {
  render() {
    return (
      <React.Fragment>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Promoters</th>
              <th>Views</th>
              <th>Applications</th>
            </tr>
          </thead>
          <tbody>
            {this.props.links.map(link => {
              return (
                <tr key={link._id}>
                  <td>
                    <Link to={'/link/' + link.linkId}>{link.title}</Link>
                  </td>
                  <td>{link.children.length}</td>
                  <td>{link.views}</td>
                  <td>{link.shares}</td>
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
      </React.Fragment>
    );
  }
}

export default JobTable;
