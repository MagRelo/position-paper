import React from 'react';
import { Link } from '@reach/router';

function JobTable({ links }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Status</th>
          <th>Applicants</th>
        </tr>
      </thead>
      <tbody>
        {links.map(link => {
          return (
            <tr key={link._id}>
              <td>
                <Link to={'/link/' + link.linkId}>{link.title}</Link>
              </td>
              <td>{link.status}</td>
              <td>
                <Link to={'/applications/' + link.linkId}>
                  {link.responses.length}
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default JobTable;
