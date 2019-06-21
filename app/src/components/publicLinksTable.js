import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function QueryLinkTable() {
  const [loadingData, setLoadingData] = useState(true);
  const [links, setLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  async function getData(searchTerm) {
    // prepare searchterm as safe url
    const response = await fetch('/api/search?' + searchTerm, {
      method: 'GET'
    });

    if (response.status === 200) {
      setLinks(await response.json());
      setLoadingData(false);
    } else {
      console.log('not found', response.status);
    }
  }

  useEffect(
    () => {
      getData(searchTerm);
    },
    [searchTerm]
  );

  return (
    <React.Fragment>
      <h2>Search Links</h2>

      <table className="pure-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Bonus</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          {links.map(link => {
            return (
              <tr key={link._id}>
                <td>
                  <Link to={'/link/' + link.linkId}>{link.query.title}</Link>
                </td>
                <td>{link.query.bonus}</td>
                <td>{link.views}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {loadingData ? (
        <div style={{ textAlign: 'center', marginTop: '1em' }}>Loading...</div>
      ) : null}
    </React.Fragment>
  );
}

export default QueryLinkTable;
