import React, { Component } from 'react';

import { formatCurrency, lineItem } from 'components/util/random';

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

      console.log(paymentObj);
      // get position data
      // const paymentResponse = await fetch(
      //   '/api/payment/' + this.props.match.params.responseId,
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(paymentObj)
      //   }
      // );

      // if (paymentResponse.status === 200) {
      //   const payment = await paymentResponse.json();
      //   console.log(payment);
      //   // setResponse(payment);
      // } else {
      //   console.log('error', paymentResponse.status);
      // }
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  }

  render() {
    return (
      <form className="pure-form" onSubmit={this.submit}>
        <legend>Query Details</legend>
        {lineItem('Target Bonus', formatCurrency(this.props.target_bonus))}
        {lineItem('Network Bonus', formatCurrency(this.props.network_bonus))}

        <legend>Target Bonus Payments</legend>
        {lineItem(this.props.target, formatCurrency(this.props.target_bonus))}

        <legend>Network Bonus Payments</legend>
        {this.props.lineItems &&
          this.props.lineItems.map((item, index) => {
            return (
              <div key={index}>
                {lineItem(item.email, formatCurrency(item.amount))}
              </div>
            );
          })}

        <legend>Card Information</legend>
        <fieldset>
          <label htmlFor="card-element">Credit or debit card</label>
          <div style={cardElementStyle()}>
            <CardElement />
          </div>
          <div className="alert">
            {}
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
      <InjectedCheckoutForm {...props} />
    </Elements>
  );
}

export default ButtonWrapper;
