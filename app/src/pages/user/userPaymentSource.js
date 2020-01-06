import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import {
  StripeProvider,
  injectStripe,
  CardElement
} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(event) {
    let { token } = await this.props.stripe.createToken({ name: 'Name' });
    let response = await fetch('/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: token.id
    });

    if (response.ok) console.log('Purchase Complete!');
  }

  render() {
    return (
      <div className="form-wrapper">
        <CardElement />

        <hr />
        <button
          className="pure-button pure-button-primary btn btn-theme btn-sm"
          onClick={this.submit}
        >
          Add Payment Source
        </button>
      </div>
    );
  }
}

const InjectedCheckoutForm = injectStripe(CheckoutForm);

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
