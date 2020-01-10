import React, { useState } from 'react';
import { Loading } from 'components/random';

import Visa from 'components/social/visa';
import MasterCard from 'components/social/mastercard';
import Discover from 'components/social/discover';
import Amex from 'components/social/amex';
import Bank from 'components/social/bank';

import {
  Elements,
  StripeProvider,
  injectStripe,
  CardElement
} from 'react-stripe-elements';

// https://stripe.com/docs/testing#cards

function PaymentSource(props) {
  const [sourceBrand, setSourceBrand] = useState(
    props.sourceBrand || 'no prop'
  );
  const [sourceLabel, setSourceLabel] = useState(props.sourceLabel);
  const [connected, setConnected] = useState(props.hasPaymentSource);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  async function onRemove(event) {
    // submit
    try {
      setLoading(true);

      // send
      const { connected, brand, label } = await removePaymentSource();

      setConnected(connected);
      setSourceBrand(brand);
      setSourceLabel(label);

      // update UI
      // setSuccess(true);
      // setComplete(true);
      setLoading(false);
    } catch (error) {
      setSuccess(false);
      setComplete(true);
      setLoading(false);
    }
  }

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
      const { brand, label } = await addPaymentSource(token);
      setSourceBrand(brand);
      setSourceLabel(label);

      // update UI
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

  function CardBrand({ brand }) {
    switch (brand) {
      case 'Visa':
        return <Visa />;
      case 'MasterCard':
        return <MasterCard />;
      case 'Discover':
        return <Discover />;
      case 'American Express':
        return <Amex />;
      default:
        return <Bank />;
    }
  }

  return (
    <div className="form-wrapper">
      {connected ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr' }}>
          <CardBrand brand={sourceBrand} />
          <span style={{ padding: '10px 10px 10px 30px', color: 'black' }}>
            {sourceLabel}
          </span>
          <div style={{ textAlign: 'right' }}>
            <button className="btn btn-sm" onClick={onRemove}>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>Add a payment source in order to post jobs.</p>
          <CardElement />

          <hr />
          {loading ? (
            <div style={{ margin: '0 auto' }}>
              <Loading />
            </div>
          ) : (
            <div>
              <button
                className="pure-button pure-button-primary btn btn-theme btn-sm"
                onClick={onSubmit}
              >
                Add Payment Source
              </button>
            </div>
          )}
        </div>
      )}

      {complete && !isSuccess ? <p>Error: {'message'}</p> : null}
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

async function removePaymentSource() {
  return fetch('/api/user/customer', {
    method: 'DELETE'
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    throw Error(response.status);
  });
}
