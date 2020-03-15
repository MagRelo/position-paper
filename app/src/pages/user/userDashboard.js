import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@reach/router';

// import { FaEdit } from 'react-icons/fa';

import UserPersonsTable from 'pages/user/userPersonsTable';
import Map from 'pages/user/map';

import { Loading, UserProfile } from 'components/random';
import { AuthContext } from 'App';

let table = [
  { Name: 'Del Piero', Position: 'ST' },
  { Name: 'Pirlo', Position: 'MC' },
  { Name: 'Buffon', Position: 'GK' }
];

function User(props) {
  const { clearSession, user } = useContext(AuthContext);

  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(user);

  const [persons, setPersons] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;

    // hit user API route, get all data
    getUser(clearSession)
      .then(body => {
        if (isSubscribed) {
          setUserData(body.user);
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

          <div className="grid grid-2">
            <div className="panel">
              <UserProfile user={userData} />
            </div>

            <div>{/* <Map /> */}</div>
          </div>

          <div className="mb-4"></div>

          <UserPersonsTable title="Get Help" data={table} />
          <UserPersonsTable title="Give Help" data={table} />
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
