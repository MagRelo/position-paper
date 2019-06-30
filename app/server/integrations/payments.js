//  Plaid
var plaid = require('plaid');
const clientId = '5d0cdd955a4c3e0012b14f6e';
const secret = 'ac69552f4c2f146f9a8ee31686e7ec';
const publicKey = '2b3f9221802f14178deef36cd7f168';
const env = 'sandbox';
var plaidClient = new plaid.Client(
  clientId,
  secret,
  publicKey,
  plaid.environments[env],
  {
    version: '2019-05-29',
    clientApp: 'Incentive Engine'
  }
);

// Stripe
let stripeApiKey = '';
if (process.env.STRIPE_TEST_MODE) {
  stripeApiKey = process.env.STRIPE_TEST_KEY;
  console.log('stripe mode: test, key: ' + stripeApiKey);
} else {
  stripeApiKey = process.env.STRIPE_LIVE_KEY;
  console.log('stripe mode: LIVE!');
}
const stripe = require('stripe')(stripeApiKey);

//
// Methods
//

exports.createStripeCustomer = async function(token, account, userData) {
  // get stripe token from plaid
  const item = await plaidClient.exchangePublicToken(token);
  const bankToken = await plaidClient.createStripeToken(
    item.access_token,
    account
  );

  // create stripe customer and attach
  const customer = await stripe.customers.create({
    source: bankToken.stripe_bank_account_token,
    description: '(' + (process.env.STRIPE_TEST_MODE ? 'TEST' : 'LIVE') + ')',
    email: userData.email,
    name: userData.name
  });

  return customer;
};

exports.createCharge = async function(
  fromAccountId,
  toAccountId,
  amount_in_cents
) {
  return stripe.charges.create({
    amount: amount_in_cents,
    currency: 'usd',
    customer: fromAccountId,
    transfer_data: {
      destination: toAccountId
    }
  });
};

exports.createStripeAccount = async function(userData, ipAddress) {
  // exchange plaid token for stripe token
  const accessToken = await plaidClient.exchangePublicToken(userData.token);
  const bankToken = await plaidClient.createStripeToken(
    accessToken.access_token,
    userData.metaData.account_id
  );

  // create "Stripe Connect" account with bank account
  const dob_array = userData.dob.split('-'); // "2019-06-13"
  const account = await stripe.accounts.create({
    type: 'custom',
    country: 'US',
    email: userData.email,
    business_type: 'individual',
    individual: {
      first_name: userData.first_name,
      last_name: userData.last_name,
      dob: {
        year: dob_array[0],
        month: dob_array[1],
        day: dob_array[2]
      },
      ssn_last_4: userData.ssn
    },
    business_profile: {
      product_description:
        'User refers information and/or applicants to platform customers'
    },
    external_account: bankToken.stripe_bank_account_token,
    tos_acceptance: {
      date: userData.tos.date,
      ip: ipAddress,
      user_agent: userData.tos.user_agent
    },
    requested_capabilities: ['platform_payments']
  });

  return account;
};
