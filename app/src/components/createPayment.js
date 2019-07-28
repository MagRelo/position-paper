import React, { Component } from 'react';

import { Elements } from 'react-stripe-elements';
import { CardElement, injectStripe } from 'react-stripe-elements';

import { formatCurrency, lineItem } from 'components/util/random';

const cardElementStyle = () => {
  return {
    padding: '0.67em',
    border: 'solid 1px #cbcbcb',
    background: 'aliceblue',
    borderRadius: '0.5em',
    marginBottom: '0.5em'
  };
};

const fee = 0.075;

function calcNetworkFee(total) {
  return total * fee;
}

function calcTotal(total) {
  return total + total * fee;
}

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = { formError: false, errorMessage: '' };
  }

  async submit(event) {
    event.preventDefault();

    if (this.props.stripe) {
      const tokenData = await this.props.stripe.createToken();

      if (tokenData.error) {
        return this.setState({
          formError: true,
          errorMessage: tokenData.error.messsage
        });
      }

      const total = calcTotal(this.props.lineItems);
      const paymentObj = {
        amount_in_cents: parseInt(total * 100),
        tokenData
      };

      console.log(paymentObj);

      const paymentResponse = await fetch(
        '/api/payment/' + this.props.responseId,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(paymentObj)
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
        {lineItem(
          'Platform Fees',
          formatCurrency(calcNetworkFee(this.props.total_incentives))
        )}
        {lineItem(
          'Total',
          formatCurrency(calcTotal(this.props.total_incentives))
        )}

        {/* CARDS */}
        <legend>Card Information</legend>
        <fieldset>
          <label htmlFor="card-element">Credit or debit card</label>
          <div style={cardElementStyle()}>
            <CardElement />
          </div>
        </fieldset>

        <legend>Terms of Service</legend>
        <fieldset>
          <label>
            <input type="checkbox" className="pure-input" />
            <span style={{ marginLeft: '0.5em' }}>Accept Blindly</span>
          </label>
        </fieldset>

        <legend>Submit Payment</legend>

        <button
          className="pure-button pure-button-primary"
          style={{ float: 'right', marginTop: '1.5em' }}
        >
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
