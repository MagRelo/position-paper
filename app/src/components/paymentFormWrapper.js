import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';

import PaymentForm from './paymentForm';

class Element extends Component {
  render() {
    return (
      <Elements>
        <PaymentForm />
      </Elements>
    );
  }
}

export default Element;
