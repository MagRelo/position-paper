import React, { useState, useEffect } from 'react';

function Response(props) {
  const [response, setResponse] = useState({});

  async function getResponse(responseId) {
    // get position data
    const response = await fetch('/api/response/' + responseId);
    if (response.status === 200) {
      const queryResponse = await response.json();
      setResponse(queryResponse);
    } else {
      console.log('not found', response.status);
    }
  }

  async function makePayment(responseId) {
    // get position data
    const response = await fetch('/api/payment/' + responseId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      const payment = await response.json();
      console.log(payment);
      // setResponse(payment);
    } else {
      console.log('not found', response.status);
    }
  }

  useEffect(() => {
    getResponse(props.match.params.responseId);
  }, props.match.params.responseId);

  return (
    <div>
      <h2>{response.title}</h2>
      <p>{response.description}</p>
      <p>{response.message}</p>
      <hr />
      <button
        className="pure-button pure-button-primary"
        onClick={() => {
          makePayment(response._id);
        }}
      >
        Confirm and Pay
      </button>
    </div>
  );
}

export default Response;
