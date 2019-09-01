import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// stripe
import { StripeProvider } from 'react-stripe-elements';

// import * as serviceWorker from './serviceWorker';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

// import { loadWeb3 } from 'state/loadWeb3';
// loadWeb3();

ReactDOM.render(
  <StripeProvider apiKey="pk_test_dMv1AAldL0wj69FLCG4c8jce00J8jWxWg9">
    <App />
  </StripeProvider>,

  document.getElementById('root')
);
