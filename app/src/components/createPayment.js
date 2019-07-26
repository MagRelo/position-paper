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

function calcNetworkFee(total, feeInBasis) {
  return total * feeInBasis;
}

function calcTotal(total, feeInBasis) {
  return total + total * feeInBasis;
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
        this.setState({
          formError: true
        });
      }

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
        <legend>Totals</legend>
        {lineItem('Target Bonus', formatCurrency(this.props.target_bonus))}
        {lineItem('Network Bonus', formatCurrency(this.props.network_bonus))}
        {lineItem(
          'Platform Fee (7.5%)',
          formatCurrency(
            calcNetworkFee(
              this.props.target_bonus + this.props.network_bonus,
              0.075
            )
          )
        )}
        {lineItem(
          'Total',
          formatCurrency(
            calcTotal(
              this.props.target_bonus +
                this.props.network_bonus +
                calcNetworkFee(
                  this.props.network_bonus + this.props.network_bonus,
                  0.075
                ),
              0.075
            )
          )
        )}

        <legend>Card Information</legend>
        <fieldset>
          <label htmlFor="card-element">Credit or debit card</label>
          <div style={cardElementStyle()}>
            <CardElement />
          </div>
        </fieldset>

        <hr />
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
