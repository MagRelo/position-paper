import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import { CardElement, injectStripe } from 'react-stripe-elements';

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
      <div className="checkout">
        <CardElement />

        <button
          className="pure-button pure-button-primary"
          onClick={this.submit}
        >
          Save
        </button>
      </div>
    );
  }
}

const Injected = injectStripe(CheckoutForm);

class Element extends Component {
  render() {
    return (
      <Elements>
        <Injected />
      </Elements>
    );
  }
}

export default Element;
