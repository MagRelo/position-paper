import React from 'react';

const clientName = 'Incentive Engine';
const env = 'sandbox';
const publicKey = '2b3f9221802f14178deef36cd7f168';
const products = ['auth'];
const institution = null;

function PlaidLinkWrapper(props) {
  function onSuccess(token, metadata) {
    props.getToken(token, metadata);
  }

  function onExit() {
    console.log('exit');
  }

  function handleOnClick(event) {
    event.preventDefault();

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

    if (window.linkHandler) {
      window.linkHandler.open(institution);
    }
  }

  return (
    <React.Fragment>
      <button
        className="pure-button pure-button-primary btn btn-theme btn-sm"
        onClick={handleOnClick}
        type="button"
      >
        Connect Bank Account
      </button>
    </React.Fragment>
  );
}

export default PlaidLinkWrapper;
