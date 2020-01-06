import React, { useState } from 'react';
import { Loading } from 'components/random';

import {
  Elements,
  StripeProvider,
  injectStripe,
  CardElement
} from 'react-stripe-elements';

// https://stripe.com/docs/testing#cards

function PaymentSource(props) {
  const [sourceLabel, setSourceLabel] = useState(props.sourceLabel);
  const [connected, setConnected] = useState(props.hasPaymentSource);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();

    let { token } = await props.stripe.createToken({ name: 'Name' });

    // don't submit without the bank account info (token)
    // if (!token) {
    //   return flashBankAccountButton();
    // }

    // submit
    try {
      setLoading(true);

      // send
      const { label } = await addPaymentSource(token);

      // update UI
      setSourceLabel(label);
      setSuccess(true);
      setComplete(true);
      setLoading(false);
      setConnected(true);
    } catch (error) {
      setSuccess(false);
      setComplete(true);
      setLoading(false);
    }
  }

  return (
    <div className="form-wrapper">
      {connected ? (
        <div>
          <span>Connected: {sourceLabel}</span>
        </div>
      ) : (
        <div>
          <CardElement />

          <hr />

          {loading ? (
            <div style={{ margin: '0 auto' }}>
              <Loading />
            </div>
          ) : (
            <div>
              {complete ? (
                <div>
                  {isSuccess ? (
                    <p>Success!</p>
                  ) : (
                    <p
                      onClick={() => {
                        setComplete(false);
                      }}
                    >
                      Error
                    </p>
                  )}
                </div>
              ) : (
                <button
                  className="pure-button pure-button-primary btn btn-theme btn-sm"
                  onClick={onSubmit}
                >
                  Add Payment Source
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// wrap to get stripe methods
const InjectedCheckoutForm = injectStripe(PaymentSource);
function StripeWrapper(props) {
  return (
    <StripeProvider apiKey="pk_test_dMv1AAldL0wj69FLCG4c8jce00J8jWxWg9">
      <Elements>
        <InjectedCheckoutForm {...props} />
      </Elements>
    </StripeProvider>
  );
}

export default StripeWrapper;

async function addPaymentSource(formObject) {
  return fetch('/api/user/customer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObject)
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    throw Error(response.status);
  });
}
