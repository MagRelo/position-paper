import React, { useState } from 'react';
import PlaidLink from 'components/loginPlaidLink';

function UserBankAccount(props) {
  const [token, setToken] = useState('');
  const [metaData, setMetaData] = useState('');
  const [bankLabel, setBankLabel] = useState('');

  // status
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  function getToken(token, metaData) {
    setToken(token);
    setMetaData(metaData);
    setBankLabel(
      metaData.accounts[0].name + ' – ' + metaData.institution.name + ' ✔'
    );

    console.log({ token, bankLabel });
  }

  function onSubmit(event) {
    event.preventDefault();

    setLoading(true);

    // format form data
    const formData = new FormData(event.target);
    const formObj = {};
    formData.forEach((value, key) => {
      formObj[key] = value;
    });

    // add token stuff
    formObj.token = token;
    formObj.metaData = metaData;
    formObj.tos = {
      date: Math.floor(Date.now() / 1000),
      user_agent: window.navigator.userAgent
    };

    try {
      // send
      addBankAccount(formObj).then(response => {
        setSuccess(true);
        setComplete(true);
        setLoading(false);
      });
    } catch (error) {
      setSuccess(false);
      setComplete(true);
      setLoading(false);
    }
  }

  return (
    <form className="pure-form" name="userBankAccount" onSubmit={onSubmit}>
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

      {loading ? (
        <div className="spinner" style={{ margin: '0 auto' }}>
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      ) : (
        <div>
          {complete ? (
            <div>{isSuccess ? <p>Success!</p> : <p>Error</p>}</div>
          ) : (
            <button type="submit" className="pure-button pure-button-primary">
              Submit
            </button>
          )}
        </div>
      )}
    </form>
  );
}

export default UserBankAccount;

async function addBankAccount(formObject) {
  return fetch('/api/user/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObject)
  }).then(response => response.json());
}
