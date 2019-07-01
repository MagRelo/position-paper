import React, { useState } from 'react';
import PlaidLink from 'components/loginPlaidLink';

function UserBankAccount(props) {
  const [token, setToken] = useState('');
  const [bankLabel, setBankLabel] = useState('');
  const [tokenData, setTokenData] = useState({});

  function getToken(token, metaData) {
    const bankLabel =
      metaData.accounts[0].name + ' – ' + metaData.institution.name + ' ✔';
    setToken(token);
    setTokenData(tokenData);
    setBankLabel(bankLabel);

    console.log({ token, tokenData, bankLabel });
  }

  return (
    <form className="pure-form">
      <legend>Link Bank Account</legend>
      <fieldset>
        <div className="row row-2">
          <div>
            <label htmlFor="first_name">First Name </label>
            <input
              className="pure-input-1"
              type="text"
              id="first_name"
              name="first_name"
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name </label>
            <input
              className="pure-input-1"
              type="text"
              id="last_name"
              name="last_name"
            />
          </div>
        </div>
        <div className="row row-3">
          <div>
            <label htmlFor="dob">Date of Birth </label>
            <input className="pure-input-1" type="date" id="dob" name="dob" />
          </div>
          <div>
            <label htmlFor="ssn">Last 4 Digits of SSN </label>
            <input className="pure-input-1" type="text" id="ssn" name="ssn" />
          </div>
          <div>
            <label htmlFor="bank">Bank Account</label>
            {token ? <p>{bankLabel}</p> : <PlaidLink getToken={getToken} />}
          </div>
        </div>

        <label>Terms of Service</label>
        <small>
          Payment processing services for users on Incentive Exchange are
          provided by Stripe and are subject to the Stripe Connected Account
          Agreement, which includes the Stripe Terms of Service (collectively,
          the “Stripe Services Agreement”). By agreeing to these terms or
          continuing to operate as a user on Incentive Exchange, you agree to be
          bound by the Stripe Services Agreement, as the same may be modified by
          Stripe from time to time. As a condition of Incentive Exchange
          enabling payment processing services through Stripe, you agree to
          provide Incentive Exchange accurate and complete information about you
          and your business, and you authorize Incentive Exchange to share it
          and transaction information related to your use of the payment
          processing services provided by Stripe.
        </small>
        <br />
        <label htmlFor="tos_agree">
          <input
            style={{ marginRight: '0.667em' }}
            type="checkbox"
            name="tos_agree"
          />{' '}
          I Agree
        </label>
      </fieldset>
    </form>
  );
}

export default UserBankAccount;
