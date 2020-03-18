import React, { useState, useEffect, useContext } from 'react';

import UserPersonsTable from 'pages/userPersonsTable';
// import Map from 'pages/user/map';

import { Loading, UserProfile } from 'components/random';
import { AuthContext } from 'App';

function User(props) {
  const { clearSession, user } = useContext(AuthContext);

  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [userData] = useState(user);

  const [getPersons, setGetPersons] = useState([]);
  const [givePersons, setGivePersons] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;

    // hit user API route, get all data
    fetchPersons(clearSession)
      .then(body => {
        if (isSubscribed) {
          setGetPersons(body.personList.filter(person => person.needsHelp));
          setGivePersons(body.personList.filter(person => person.offeringHelp));
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
        setError(error.toString());
        setIsLoading(false);
      });

    // cleanup
    return () => {
      isSubscribed = false;
    };
  }, [clearSession]);

  return (
    <div className="container">
      <div className="mb-4"></div>

      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {error ? (
            <p style={{ textAlign: 'center' }}>{error}</p>
          ) : (
            <React.Fragment>
              <div className="grid grid-2">
                <div className="panel">
                  <UserProfile user={userData} />
                </div>

                <div>{/* <Map /> */}</div>
              </div>

              <div className="mb-4"></div>

              <h2>Get Help</h2>
              <UserPersonsTable data={getPersons} />

              <h2>Give Help</h2>
              <UserPersonsTable data={givePersons} />
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
}

export default User;

async function fetchPersons(clearSession) {
  return await fetch('/api/persons').then(response => {
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
