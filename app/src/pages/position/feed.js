import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@reach/router';

import { AuthContext } from 'App';

import { Loading } from 'components/random';

function FeedPage({ userId }) {
  const { callApi } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [propsList, setPropsList] = useState([]);

  useEffect(() => {
    setLoading(true);

    const method = 'GET';
    let endPoint = '/api/props';

    // limit by user
    if (userId) {
      endPoint = endPoint + '?user=' + userId;
    }

    callApi(method, endPoint)
      .then((body) => {
        setPropsList(body.props);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.toString());
        setLoading(false);
      });
  }, [userId, callApi]);

  return (
    <div>
      {error ? <p>{error}</p> : null}
      {loading ? (
        <Loading />
      ) : (
        <div>
          {!propsList.length ? <p>No Props</p> : null}
          {propsList.map((prop) => {
            return (
              <Link
                to={'/position/' + prop._id}
                className="panel"
                key={prop._id}
              >
                {prop.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FeedPage;
