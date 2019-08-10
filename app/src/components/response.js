import React, { useState, useEffect } from 'react';

import PaymentForm from 'components/createPayment';

import { formatCurrency, lineItem } from 'components/util/random';

function getTotal(targetPayouts, networkPayouts) {
  const targetTotal = targetPayouts.reduce((acc, payout) => {
    return acc + payout.amount;
  }, 0);

  const networkTotal = networkPayouts.reduce((acc, payout) => {
    return acc + payout.amount;
  }, 0);

  return targetTotal + networkTotal;
}

function Response(props) {
  const [user, setUser] = useState({});
  const [response, setResponse] = useState({});
  const [networkPayouts, setNetworkPayouts] = useState([]);
  const [targetPayouts, setTargetPayouts] = useState([]);
  const [respondant, setRespondant] = useState({});
  // const [query, setQuery] = useState({});

  useEffect(() => {
    getResponse(props.match.params.responseId).then(result => {
      setResponse(result);
      setUser(result.user);
      setNetworkPayouts(result.networkPayouts);
      setTargetPayouts(result.targetPayouts);
      setRespondant(result.user);
      // setQuery(result.query);
    });
  }, props.match.params.responseId);

  return (
    <div className="row row-5-3">
      <div>
        <h3 className="section-header">Response</h3>
        <div className="testimonial-quote group ">
          <img src="http://placehold.it/120x120" alt="avatar" />
          <div className="quote-container">
            <blockquote>
              <p>{response.message}</p>
            </blockquote>
            <cite>
              <span>{respondant.name}</span>
              <br /> {respondant.location}
              {/* <br /> American College of Chest Physicians */}
            </cite>
          </div>
        </div>
      </div>

      <div>
        <h3 className="section-header">Incentives</h3>

        {/* network */}
        <h4 className="section-header">Network Incentives</h4>
        {networkPayouts.map((item, index) => {
          return (
            <div key={index}>
              {lineItem(item.email, formatCurrency(item.amount))}
            </div>
          );
        })}

        {/* target */}
        <h4 className="section-header">Target Incentives</h4>
        {targetPayouts.map((item, index) => {
          return (
            <div key={index}>
              {lineItem(item.email, formatCurrency(item.amount))}
            </div>
          );
        })}

        {user.isQueryOwner ? (
          <React.Fragment>
            <h3 className="section-header">Confirm & Pay</h3>
            <PaymentForm
              responseId={response._id}
              total_incentives={getTotal(targetPayouts, networkPayouts)}
            />
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
}

export default Response;

async function getResponse(id) {
  return await fetch('/api/response/' + id).then(response => response.json());
}
