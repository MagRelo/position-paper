import React, { Component } from 'react';

import { Elements } from 'react-stripe-elements';
import { CardElement, injectStripe } from 'react-stripe-elements';

const cardElementStyle = () => {
  return {
    padding: '0.67em',
    border: 'solid 1px #cbcbcb',
    background: 'aliceblue',
    borderRadius: '0.5em',
    marginBottom: '0.5em'
  };
};

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(event) {
    event.preventDefault();

    if (this.props.stripe) {
      const tokenData = await this.props.stripe.createToken();

      const paymentObj = {
        amount_in_cents: 0,
        tokenData
      };

      // get position data
      const paymentResponse = await fetch(
        '/api/payment/' + this.props.match.params.responseId,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: {}
        }
      );

      if (paymentResponse.status === 200) {
        const payment = await paymentResponse.json();
        console.log(payment);
        // setResponse(payment);
      } else {
        console.log('error', paymentResponse.status);
      }
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  }

  render() {
    return (
      <form className="pure-form" onSubmit={this.submit}>
        <legend>Payment Details</legend>

        <fieldset>
          {this.props.lineItems &&
            this.props.lineItems.map(item => {
              return (
                <div key={item._id} className="line-item">
                  <div>{item._id}</div>
                  <div className="line-item-filler" />
                  <div>{item.payout}</div>
                </div>
              );
            })}
        </fieldset>

        <legend>Payment Method</legend>
        <fieldset>
          <label htmlFor="card-element">Credit or debit card</label>
          <div style={cardElementStyle()}>
            <CardElement />
          </div>
        </fieldset>

        <legend>Make Payment</legend>
        <button className="pure-button pure-button-primary">
          Submit Payment
        </button>
      </form>
    );
  }
}

const InjectedCheckoutForm = injectStripe(CheckoutForm);

function ButtonWrapper(props) {
  return (
    <Elements>
      <InjectedCheckoutForm
        onSubmit={props.onSubmit}
        lineItems={props.lineItems}
      />
    </Elements>
  );
}

export default ButtonWrapper;
