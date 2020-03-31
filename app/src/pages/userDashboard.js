import React, { useState, useEffect, useContext } from 'react';

import UserPersonsTable from 'pages/userPersonsTable';
// import Map from 'pages/user/map';

import { Loading, UserProfile } from 'components/random';
import { AuthContext } from 'App';

function User(props) {
  const { user, callApi } = useContext(AuthContext);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [getPersons, setGetPersons] = useState([]);
  const [givePersons, setGivePersons] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;

    // hit user API route, get all data
    const method = 'GET';
    const endPoint = '/api/persons';
    callApi(method, endPoint)
      .then(body => {
        if (isSubscribed) {
          setGetPersons(body.personList.filter(person => person.needsHelp));
          setGivePersons(body.personList.filter(person => person.offeringHelp));
          setIsLoading(false);
        }
      })
      .catch(error => {
        if (isSubscribed) {
          console.log(error);
          setError(error.toString());
          setIsLoading(false);
        }
      });

    // cleanup
    return () => {
      isSubscribed = false;
    };
  }, [callApi]);

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
                  <UserProfile user={user} />
                </div>

                <div>{/* <Map /> */}</div>
              </div>

              <div className="mb-4"></div>

              <h2 style={{ margin: 0 }}>People in Need</h2>
              <UserPersonsTable
                data={getPersons}
                filename={'people_in_need-' + fileNameDate() + '.csv'}
              />

              <h2 style={{ margin: 0 }}>Volunteers</h2>
              <UserPersonsTable
                data={givePersons}
                filename={'volunteers-' + fileNameDate() + '.csv'}
              />
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
}

export default User;

function fileNameDate() {
  var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
