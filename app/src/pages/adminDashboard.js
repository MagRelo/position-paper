import React, { useState, useEffect, useContext } from 'react';

import AddUserAdmin from 'pages/addUser';
// import Map from 'pages/user/map';

import { Loading } from 'components/random';
import { AuthContext } from 'App';

function User(props) {
  const { clearSession } = useContext(AuthContext);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [unApprovedUsers, setUnApprovedUsers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;

    // hit user API route, get all data
    getUser(clearSession)
      .then(body => {
        if (isSubscribed) {
          setUnApprovedUsers([]);
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

  return (
    <div className="container">
      {error ? <p style={{ textAlign: 'center' }}>{error}</p> : null}

      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="mb-4"></div>

          <h1>Admin Dashboard</h1>

          <div className="mb-4"></div>
          <AddUserAdmin />

          <div className="mb-4"></div>
          <h2>Approve Application</h2>

          <table>
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
                      <button className="btn btn-small btn-theme">
                        Approve
                      </button>
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

async function getUser(clearSession) {
  return await fetch('/api/user').then(response => {
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
