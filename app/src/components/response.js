import React, { useState, useEffect } from 'react';

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

  return (
    <div>
      <h2>Response</h2>

      <p>
        {respondant.name} <small>{respondant.email}</small>
      </p>

      <p>{response.message}</p>

      <h3>Link Payments</h3>
      <table className="pure-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Payout</th>
          </tr>
        </thead>
        <tbody>
          {payoffs.map(item => {
            return (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.payout}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

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
