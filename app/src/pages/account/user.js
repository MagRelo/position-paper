import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@reach/router';

import { AuthContext } from 'App';

import { Loading } from 'components/random';

import { UserProfile } from 'pages/account/userProfile';
import Feed from 'pages/position/feed';

function User(props) {
  const { callApi } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [user, setUser] = useState(false);

  useEffect(() => {
    setLoading(true);

    const method = 'GET';
    const endPoint = '/api/user';
    callApi(method, endPoint)
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.toString());
        setLoading(false);
      });
  }, [callApi]);

  return (
    <section className="container">
      {error ? <p>{error}</p> : null}
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-5-3">
          <div className="swap-order">
            <Link to="/profile" className="panel">
              <UserProfile user={user} />
            </Link>
          </div>

          <div>
            <h2>Open Positions</h2>
            <div className="mb-4"></div>
            <Feed userId={user._id} />
          </div>
        </div>
      )}
    </section>
  );
}

export default User;
