import React, { useState, useEffect } from 'react';

import PaymentForm from 'components/createPayment';

function Response(props) {
  const [response, setResponse] = useState({});
  const [payoffs, setPayoffs] = useState([]);
  const [respondant, setRespondant] = useState({});
  const [query, setQuery] = useState({});

  useEffect(() => {
    getResponse(props.match.params.responseId).then(result => {
      setResponse(result);
      setPayoffs(result.payoutArray);
      setRespondant(result.respondingUser);
      setQuery(result.query);
    });
  }, props.match.params.responseId);

  return (
    <div>
      <div className="row row-2">
        <div>
          <h3 className="section-header">Response</h3>
          <p>{response.message}</p>
          <p style={{ textAlign: 'right' }}>{respondant.email}</p>
        </div>
        <div>
          <h3 className="section-header">Confirm & Pay</h3>
          <PaymentForm
            network_bonus={query.network_bonus}
            target_bonus={query.target_bonus}
            target={respondant.email}
            lineItems={payoffs}
          />
        </div>
      </div>
    </div>
  );
}

export default Response;

async function getResponse(id) {
  return await fetch('/api/response/' + id).then(response => response.json());
}
