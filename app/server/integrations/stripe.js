let stripeApiKey = '';
if (process.env.STRIPE_TEST_MODE) {
  stripeApiKey = process.env.STRIPE_TEST_KEY;
  console.log('stripe mode: test, key: ' + stripeApiKey);
} else {
  stripeApiKey = process.env.STRIPE_LIVE_KEY;
  console.log('stripe mode: LIVE');
}

const stripe = require('stripe')(stripeApiKey);

// stripe.charges.retrieve('ch_1Eb9eyKDqYLeupJPZlkVtAPZ', {
//   api_key: 'sk_test_yXADfBHmXOanF981juFqbgyW00dsT1QRFj'
// });
