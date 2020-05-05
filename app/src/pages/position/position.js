import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from 'App';

import { Loading } from 'components/random';

function Prop({ propId }) {
  const { callApi } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [prop, setProp] = useState({});

  useEffect(() => {
    setLoading(true);

    const method = 'GET';
    const endPoint = '/api/props/' + propId;
    callApi(method, endPoint)
      .then((body) => {
        setProp(body.prop);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.toString());
        setLoading(false);
      });
  }, [propId, callApi]);

  return (
    <section className="container">
      {error ? <p>{error}</p> : null}
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1>{prop.title}</h1>
        </div>
      )}
    </section>
  );
}

export default Prop;
