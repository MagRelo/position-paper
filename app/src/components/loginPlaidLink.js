import React from 'react';

const clientName = 'Incentive Engine';
const env = 'sandbox';

const publicKey = '2b3f9221802f14178deef36cd7f168';

const products = ['auth'];
const institution = null;

function PlaidLinkWrapper(props) {
  // setup plaid link
  window.linkHandler = window.Plaid.create({
    selectAccount: true,
    env: env,
    clientName: clientName,
    key: publicKey,
    product: products,
    onExit: onExit,
    onSuccess: onSuccess
  });

  function onSuccess(token, metadata) {
    props.getToken(token, metadata.account_id);
  }

  function onExit() {
    console.log('exit');
  }

  function handleOnClick(event) {
    if (window.linkHandler) {
      window.linkHandler.open(institution);
    }
  }

  return (
    <React.Fragment>
      <button
        className="pure-button pure-button-primary"
        onClick={handleOnClick}
      >
        Signup
      </button>
    </React.Fragment>
  );
}

export default PlaidLinkWrapper;
