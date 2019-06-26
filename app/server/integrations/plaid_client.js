// Change sandbox to development to test with live users and change
// to production when you're ready to go live!
var plaid = require('plaid');

const clientId = '5d0cdd955a4c3e0012b14f6e';
const secret = 'ac69552f4c2f146f9a8ee31686e7ec';
const publicKey = '2b3f9221802f14178deef36cd7f168';
const env = 'sandbox';

//
// Plaid Client
//
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

exports.getStripeBankAccountToken = async function(publicToken, accountId) {
  const item = await plaidClient.exchangePublicToken(publicToken);
  const bankToken = await plaidClient.createStripeToken(
    item.access_token,
    accountId
  );
  return bankToken.stripe_bank_account_token;
};
