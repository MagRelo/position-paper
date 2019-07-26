import React, { useState, useEffect } from 'react';

import PaymentForm from 'components/createPayment';

import { formatCurrency, lineItem } from 'components/util/random';

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
    <div className="row row-2">
      <div>
        <h3 className="section-header">Response</h3>
        <div className="testimonial-quote group ">
          <img src="http://placehold.it/120x120" alt="avatar" />
          <div className="quote-container">
            <blockquote>
              <p>{response.message}</p>
            </blockquote>
            <cite>
              <span>{`Your Name Here`}</span>
              <br /> {respondant.email}
              <br /> American College of Chest Physicians
            </cite>
          </div>
        </div>
      </div>

      <div>
        <h3 className="section-header">Network Incentives</h3>

        <h4 className="section-header">Target Bonus Payments</h4>

        {lineItem(respondant.email, formatCurrency(query.target_bonus))}

        <h4 className="section-header">Network Bonus Payments</h4>

        {payoffs &&
          payoffs.map((item, index) => {
            return (
              <div key={index}>
                {lineItem(item.email, formatCurrency(item.amount))}
              </div>
            );
          })}

        <h3 className="section-header">Confirm & Pay</h3>
        <PaymentForm
          network_bonus={query.network_bonus}
          target_bonus={query.target_bonus}
          target={respondant.email}
          lineItems={payoffs}
        />
      </div>
    </div>
  );
}

export default Response;

async function getResponse(id) {
  return await fetch('/api/response/' + id).then(response => response.json());
}
