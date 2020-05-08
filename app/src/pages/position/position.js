import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from 'App';

import { Loading } from 'components/random';
import { formatDate, formatCurrency } from 'components/random';
import { UserProfile } from 'pages/account/userProfile';

function Prop({ propId }) {
  const { callApi } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [prop, setProp] = useState(null);

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
    <section
      className="container"
      style={{ maxWidth: '48rem', margin: '0 auto' }}
    >
      {error ? <p>{error}</p> : null}
      {loading ? <Loading /> : null}
      {prop ? <Position position={prop} /> : null}
    </section>
  );
}

function Position({ position }) {
  return (
    <div className="panel position">
      <div className="trade-band">
        <span style={{ float: 'right' }}>{formatDate(position.createdAt)}</span>
        {tradeCaption(position)}
      </div>

      <div className="mb-4"></div>
      <h1>{position.title}</h1>
      <div
        className="job-description"
        dangerouslySetInnerHTML={createMarkup(position.renderedHtml)}
      />

      <hr />
      <UserProfile displayUser={position.user} showFollow={true} />
    </div>
  );
}

function tradeCaption(position) {
  let start = '';
  start += position.direction === 'long' ? 'Long ETH ' : 'Short ETH ';
  start += 'for ' + position.length + ' – ';
  start +=
    formatCurrency(position.amount) + ' at ' + position.leverage + ' leverage';

  return start;
}

function createMarkup(markup) {
  return { __html: markup };
}
export default Prop;
