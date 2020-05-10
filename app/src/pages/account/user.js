import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@reach/router';

import { AuthContext } from 'App';

import { Loading } from 'components/random';

import { UserProfile } from 'pages/account/userProfile';
import Feed from 'pages/position/feed';

function User({ userId }) {
  const { callApi } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [user, setUser] = useState(false);

  useEffect(() => {
    setLoading(true);

    const method = 'GET';
    const endPoint = '/api/user/' + userId;
    callApi(method, endPoint)
      .then((body) => {
        setUser(body);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.toString());
        setLoading(false);
      });
  }, [userId, callApi]);

  return (
    <section className="container">
      {error ? <p>{error}</p> : null}
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-3-5">
          <div>
            <UserProfile displayUser={user} showFollow={true} />
            <hr />
            <p>Global Rank</p>
            <p>Rank In Your Network</p>
            <p>Network Connections</p>
          </div>

          <div>
            <h2>Open Positions</h2>
            <div className="mb-4"></div>
            <Feed items={[]} />
          </div>
        </div>
      )}
    </section>
  );
}

export default User;
