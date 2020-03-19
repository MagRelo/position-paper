import React, { useState, useEffect, useContext } from 'react';

import AddUserAdmin from 'pages/addUser';
// import Map from 'pages/user/map';

import { Loading, Bouncing } from 'components/random';
import { AuthContext } from 'App';

function User(props) {
  const { clearSession } = useContext(AuthContext);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [unApprovedUsers, setUnApprovedUsers] = useState([]);

  const [buttonLoading, setButtonLoading] = useState('');
  const [completedApps, setCompletedApps] = useState([]);
  // const [buttonLoading, setButtonLoading] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;

    // hit user API route, get all data
    getUnnapprovedOrgs(clearSession)
      .then(body => {
        if (isSubscribed) {
          setUnApprovedUsers(body.orgsList);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
        setError(error.toString());
      });

    // cleanup
    return () => {
      isSubscribed = false;
    };
  }, [clearSession]);

  function approveOrg(id) {
    console.log('approve', id);

    setButtonLoading(id);

    approveUser(id)
      .then(response => {
        setCompletedApps([id, ...completedApps]);
        setButtonLoading(null);
      })
      .catch(error => {
        alert(error);
      });
  }

  return (
    <div className="container">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="mb-4"></div>
          {error ? <p style={{ textAlign: 'center' }}>{error}</p> : null}

          <h1>Admin Dashboard</h1>

          <div className="mb-4"></div>
          <AddUserAdmin />

          <div className="mb-4"></div>
          <h2>Approve Organization</h2>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Approve</th>
              </tr>
            </thead>
            <tbody>
              {unApprovedUsers.map(user => {
                return (
                  <tr key={user._id}>
                    <td>{user.displayName}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>
                      {~completedApps.indexOf(user._id) ? (
                        '✓'
                      ) : (
                        <button
                          className="btn btn-small btn-theme"
                          onClick={() => {
                            approveOrg(user._id);
                          }}
                        >
                          {buttonLoading === user._id ? (
                            <Bouncing />
                          ) : (
                            'Approve'
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default User;

async function getUnnapprovedOrgs(clearSession) {
  return await fetch('/api/pending-orgs').then(response => {
    if (response.status === 200) {
      return response.json();
    }

    // some type of error has occured...
    if (response.status === 401) {
      // logout with context function
      console.log(response.status, 'logging out...');
      clearSession();
    }

    console.log(response.status);
    throw new Error(response.statusText);
  });
}

async function approveUser(id) {
  const method = 'POST';
  const endPoint = '/api/approve-user-admin';

  return fetch(endPoint, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: id })
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    // some type of error has occured...
    console.log(response.status, response.statusText);
    throw new Error(response.statusText);
  });
}
