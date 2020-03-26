import React, { useState, useEffect, useContext } from 'react';

import AddUserAdmin from 'pages/addUserAdmin';
// import Map from 'pages/user/map';

import { Loading, Bouncing } from 'components/random';
import { AuthContext } from 'App';

function User(props) {
  const { clearSession } = useContext(AuthContext);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [allUsers, setAllUsers] = useState([]);
  const [unApprovedUsers, setUnApprovedUsers] = useState([]);

  const [buttonLoading, setButtonLoading] = useState('');
  const [needsRefresh, setNeedsRefresh] = useState(false);
  // const [buttonLoading, setButtonLoading] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;

    // hit user API route, get all data
    getUnnapprovedOrgs(clearSession)
      .then(body => {
        if (isSubscribed) {
          setAllUsers(body.orgsList);
          setUnApprovedUsers(
            body.orgsList.filter(org => org.status === 'Pending')
          );
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
  }, [clearSession, needsRefresh]);

  function changeUserStatus(id, status) {
    console.log('approve', id);

    setButtonLoading(id);

    approveUser(id, status)
      .then(response => {
        setNeedsRefresh(id);
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
          <h2>Pending Organizations</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
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
                      <button
                        className="btn btn-small btn-theme"
                        onClick={() => {
                          changeUserStatus(user._id, 'Approved');
                        }}
                      >
                        {buttonLoading === user._id ? <Bouncing /> : 'Approve'}
                      </button>
                      <button
                        className="btn btn-small btn-red"
                        onClick={() => {
                          changeUserStatus(user._id, 'Closed');
                        }}
                      >
                        {buttonLoading === user._id ? <Bouncing /> : 'Reject'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mb-4"></div>
          <h2>All Organizations</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map(user => {
                return (
                  <tr key={user._id}>
                    <td>{user.displayName}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mb-4"></div>
          <AddUserAdmin />
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

async function approveUser(id, status) {
  const method = 'POST';
  const endPoint = '/api/approve-user-admin';

  return fetch(endPoint, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: id, status: status })
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    // some type of error has occured...
    console.log(response.status, response.statusText);
    throw new Error(response.statusText);
  });
}
