import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from 'App';

import { Loading } from 'components/random';
import Feed from 'pages/position/feed';

function FrontPage(props) {
  const { callApi } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    const method = 'GET';
    const endPoint = '/api/props';
    callApi(method, endPoint)
      .then((body) => {
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

      <div>
        <h1>Headline</h1>
        {loading ? <Loading /> : <Feed />}
      </div>
    </section>
  );
}

export default FrontPage;
