import React, { useState } from 'react';

// import { Elements } from 'react-stripe-elements';
// import { CardElement, injectStripe } from 'react-stripe-elements';
// import { StripeProvider } from 'react-stripe-elements';

// stripe

import { formatCurrency, lineItem } from 'components/random';

function PaymentForm(props) {
  const [isLoading, setIsLoading] = useState(false);

  const total = props.total || 1000;

  function submit(event) {
    event.preventDefault();

    //send
    try {
      setIsLoading(true);

      // submit
      createPayment(props.responseId).then(body => {
        console.log('complete');
      });
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <div className="form-wrapper">
      <form className="pure-form" onSubmit={submit}>
        <legend>Payment Source</legend>
        <p>{props.paymentSourceLabel}</p>

        <legend>Charges</legend>
        {lineItem('Total', formatCurrency(total))}

        <legend>Terms of Service</legend>
        <fieldset>
          <label>
            <input type="checkbox" className="pure-input" />
            <span style={{ marginLeft: '0.5em' }}>Accept Blindly</span>
          </label>
        </fieldset>

        <hr />
        <button className="btn btn-theme btn-sm">
          {isLoading ? (
            <div className="spinner">
              <div />
            </div>
          ) : (
            <span>Submit Payment</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;

async function createPayment(responseId) {
  const apiEndpoint = '/api/application/payment';

  return await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      responseId
    })
  })
    .then(r => {
      return r.status === 200 ? r.json() : {};
    })
    .catch(error => {
      console.error(error);
      return {};
    });
}
