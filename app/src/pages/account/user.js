import React, { useState, useEffect, useContext } from 'react';
// import { Link } from '@reach/router';

import { Loading } from 'components/random';

import Dashboard from 'pages/account/dashboard';

import { AuthContext } from 'App';

function User({ userId }) {
  const { callApi, user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [displayUser, setDisplayUser] = useState(false);
  const [stats, setStats] = useState(false);

  // if not userId => we're on /account
  const isMe = !userId;
  const apiUserId = userId ? userId : user._id;

  useEffect(() => {
    setLoading(true);
    const method = 'GET';
    const endPoint = '/api/user/' + apiUserId;
    callApi(method, endPoint)
      .then((body) => {
        setDisplayUser(body.user);
        setStats(body.stats);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.toString());
        setLoading(false);
      });
  }, [apiUserId, callApi]);

  return (
    <section className="container">
      {error ? <p>{error}</p> : null}
      {loading ? <Loading /> : null}
      {displayUser ? (
        <Dashboard isMe={isMe} user={displayUser} stats={stats} />
      ) : null}
    </section>
  );
}

export default User;
