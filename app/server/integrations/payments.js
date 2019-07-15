//  Plaid
var plaid = require('plaid');

const clientAppName = process.env.PLAID_CLIENT_APP_NAME || 'Incentive Exchange';
const clientId = process.env.PLAID_CLIENT_ID || '5d0cdd955a4c3e0012b14f6e';
const secret = process.env.PLAID_SECRET || 'ac69552f4c2f146f9a8ee31686e7ec';
const publicKey =
  process.env.PLAID_PUBLIC_KEY || '2b3f9221802f14178deef36cd7f168';
const env = process.env.PLAID_ENV || 'sandbox';

var plaidClient = new plaid.Client(
  clientId,
  secret,
  publicKey,
  plaid.environments[env],
  {
    version: '2019-05-29',
    clientApp: clientAppName
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

exports.createStripeCustomer = async function(userData) {
  const userObject = {
    name: userData.name,
    email: userData.email,
    description: '(' + (process.env.STRIPE_TEST_MODE ? 'TEST' : 'LIVE') + ')'
  };

  // if bank account token, then attach as "source"
  if (userData.token) {
    // get stripe token from plaid
    const item = await plaidClient.exchangePublicToken(userData.token);
    const bankToken = await plaidClient.createStripeToken(
      item.access_token,
      userData.account
    );
    // add bank account as "source" to userObject
    userObject.source = bankToken.stripe_bank_account_token;
  }

  // create stripe customer and attach
  return await stripe.customers.create(userObject);
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

exports.createStripeCharge = async function(
  fromAccountId,
  toAccountId,
  amount_in_cents
) {
  const response = await stripe.charges.create({
    amount: amount_in_cents,
    currency: 'usd',
    customer: fromAccountId,
    transfer_data: {
      destination: toAccountId
    }
  });

  return response;
};
