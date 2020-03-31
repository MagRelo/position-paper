import React, { useState, useEffect, useContext } from 'react';

import AddUserAdmin from 'pages/addUserAdmin';
// import Map from 'pages/user/map';

import { Loading, Bouncing } from 'components/random';
import { AuthContext } from 'App';

function User(props) {
  const { callApi } = useContext(AuthContext);

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

    const method = 'GET';
    const endPoint = '/api/pending-orgs';
    callApi(method, endPoint)
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
        if (isSubscribed) {
          console.log(error);
          setError(error.toString());
        }
      });

    // cleanup
    return () => {
      isSubscribed = false;
    };
  }, [callApi, needsRefresh]);

  function changeUserStatus(id, status) {
    setButtonLoading(id);

    const method = 'POST';
    const endPoint = '/api/approve-user-admin';
    const body = { userId: id, status: status };
    callApi(method, endPoint, body)
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

          <div className="mb-4"></div>
          <h2>Pending Organizations</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Organization</th>
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
                    <td>{user.description}</td>
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
                <th>Organization</th>
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
                    <td>{user.description}</td>
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
