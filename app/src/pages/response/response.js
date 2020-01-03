import React, { useState, useEffect } from 'react';

import PaymentForm from './createPayment';
import ResponseStatus from './responseStatus';

import { formatCurrency, lineItem } from 'components/random';

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
  const [responseId] = useState(props.responseId);

  // local data
  const [user, setUser] = useState({});
  const [response, setResponse] = useState({});
  const [networkPayouts, setNetworkPayouts] = useState([]);
  const [targetPayouts, setTargetPayouts] = useState([]);
  // const [respondant, setRespondant] = useState({});

  useEffect(() => {
    getResponse(responseId).then(result => {
      setResponse(result);
      setUser(result.user);
      setNetworkPayouts(result.networkPayouts);
      setTargetPayouts(result.targetPayouts);
      // setRespondant(result.user);
    });
  }, responseId);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <h3 className="section-header">Job</h3>
          {lineItem('title', 'title*')}
          {lineItem('employer', 'employer*')}
          <h3 className="section-header">Profile</h3>

          <div className="user-profile">
            <img src={user.avatar} alt="avatar" className="user-avatar" />
            <div className="user-info">
              <div className="user-name">{user.name}</div>
            </div>
          </div>

          <h3 className="section-header">Application Status</h3>
          <ResponseStatus status={response.status} />
        </div>

        <div className="col-lg-6">
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
    </div>
  );
}

export default Response;

async function getResponse(id) {
  return await fetch('/api/response/' + id).then(response => response.json());
}
