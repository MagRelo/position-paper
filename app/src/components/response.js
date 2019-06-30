import React, { useState, useEffect } from 'react';

import PaymentButton from 'components/paymentButton';

function Response(props) {
  const [response, setResponse] = useState({});
  const [payoffs, setPayoffs] = useState([]);
  const [respondant, setRespondant] = useState({});

  async function getResponse(responseId) {
    // get position data
    const response = await fetch('/api/response/' + responseId);
    if (response.status === 200) {
      const queryResponse = await response.json();
      setResponse(queryResponse);
      setPayoffs(queryResponse.payoutArray);
      setRespondant(queryResponse.respondingUser);
    } else {
      console.log('not found', response.status);
    }
  }
  useEffect(() => {
    getResponse(props.match.params.responseId);
  }, props.match.params.responseId);

  return (
    <div>
      <h2>Response</h2>

      <p>
        {respondant.name} <small>{respondant.email}</small>
      </p>

      <p>{response.message}</p>
      <hr />

      <PaymentButton lineItems={payoffs}>Confirm and Pay</PaymentButton>
    </div>
  );
}

export default Response;
