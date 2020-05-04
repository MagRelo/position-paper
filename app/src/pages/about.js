import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from 'App';

import { Loading } from 'components/random';

function AboutPage(props) {
  const { callApi } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    const method = 'GET';
    const endPoint = '/auth/status';
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
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1>About</h1>
          <p>info@incentive.exchange</p>
          <p>Servesa, Inc. 2019</p>
        </div>
      )}
    </section>
  );
}

export default AboutPage;
