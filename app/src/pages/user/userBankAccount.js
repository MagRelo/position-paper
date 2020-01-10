import React, { useState } from 'react';
import { Loading } from 'components/random';

import Bank from 'components/social/bank';

//Plaid api info
const clientName = 'Incentive Engine';
const env = 'sandbox';
const publicKey = '2b3f9221802f14178deef36cd7f168';
const products = ['auth'];
const institution = null;

function UserBankAccount(props) {
  const [connected, setConnected] = useState(props.hasAccount);
  const [bankLabel, setBankLabel] = useState(props.bankLabel);

  const [token, setToken] = useState('');
  const [metaData, setMetaData] = useState('');
  const [flashBankButton, setFlashBankButton] = useState(false);

  // status
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  function formatBankLabel(metaData) {
    // console.log('format meta:', metaData);
    let label = '';

    if (metaData.accounts && metaData.accounts[0]) {
      label += metaData.accounts[0].name + ' – ';
    }
    if (metaData.institution && metaData.institution.name) {
      label += metaData.institution.name;
    }

    return label;
  }

  function plaidSuccess(token, metaData) {
    // console.log('plaid success', token, metaData);

    setToken(token);
    setMetaData(metaData);
    setBankLabel(formatBankLabel(metaData));
  }

  function plaidExit() {
    console.log('exit');
  }

  function launchPlaid(event) {
    event.preventDefault();

    // setup plaid link
    window.linkHandler = window.Plaid.create({
      selectAccount: true,
      env: env,
      clientName: clientName,
      key: publicKey,
      product: products,
      onExit: plaidExit,
      onSuccess: plaidSuccess
    });

    if (window.linkHandler) {
      window.linkHandler.open(institution);
    }
  }

  async function onRemove(event) {
    // submit
    try {
      setLoading(true);

      // send
      const { connected, label } = await removeBankAccount();

      setConnected(connected);
      setBankLabel(label);

      // update UI
      setSuccess(true);
      setComplete(true);
      setLoading(false);
    } catch (error) {
      setSuccess(false);
      setComplete(true);
      setLoading(false);
    }
  }

  async function onSubmit(event) {
    event.preventDefault();

    // don't submit without the bank account info (token)
    if (!token) {
      return flashBankAccountButton();
    }

    // submit
    try {
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
      formObj.bankAccountLabel = bankLabel;
      formObj.tos = {
        date: Math.floor(Date.now() / 1000),
        user_agent: window.navigator.userAgent
      };

      // send
      await addBankAccount(formObj);

      // update UI
      setSuccess(true);
      setComplete(true);
      setLoading(false);
      setConnected(true);
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setComplete(true);
      setLoading(false);
    }
  }

  function flashBankAccountButton() {
    setFlashBankButton(true);
    setTimeout(() => {
      setFlashBankButton(false);
    }, 450);
  }

  return (
    <div className="form-wrapper">
      {connected ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr' }}>
          <Bank />
          <span style={{ padding: '10px 10px 10px 30px', color: 'black' }}>
            {bankLabel}
          </span>
          <div style={{ textAlign: 'right' }}>
            <button className="btn btn-sm" onClick={onRemove}>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <form name="userBankAccount" onSubmit={onSubmit}>
          <p>Link a bank account in order to receive deposits.</p>
          <fieldset>
            <div className="grid grid-2">
              <div className="form-group">
                <label htmlFor="first_name">First Name </label>
                <input
                  className="form-control"
                  type="text"
                  id="first_name"
                  name="first_name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="last_name">Last Name </label>
                <input
                  className="form-control"
                  type="text"
                  id="last_name"
                  name="last_name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-3">
              <div className="form-group">
                <label htmlFor="dob">Date of Birth </label>
                <input
                  className="form-control"
                  type="date"
                  id="dob"
                  name="dob"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="ssn">Last 4 Digits of SSN </label>
                <input
                  className="form-control"
                  type="number"
                  maxLength="4"
                  minLength="4"
                  id="ssn"
                  name="ssn"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="bank">Bank Account</label>
                {token ? (
                  <p>{bankLabel}</p>
                ) : (
                  <button
                    style={
                      flashBankButton ? { backgroundColor: '#7329c2' } : {}
                    }
                    className="pure-button pure-button-primary btn btn-theme btn-sm"
                    onClick={launchPlaid}
                    type="button"
                  >
                    Connect Bank Account
                  </button>
                )}
              </div>
            </div>
          </fieldset>
          <hr />
          {loading ? (
            <div style={{ margin: '0 auto' }}>
              <Loading />
            </div>
          ) : (
            <div>
              {complete ? (
                <div>
                  {isSuccess ? (
                    <p>Success!</p>
                  ) : (
                    <p
                      onClick={() => {
                        setComplete(false);
                      }}
                    >
                      Error
                    </p>
                  )}
                </div>
              ) : (
                <button
                  type="submit"
                  className="pure-button pure-button-primary btn btn-theme btn-sm"
                >
                  Submit
                </button>
              )}
            </div>
          )}
        </form>
      )}
    </div>
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
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    throw Error(response.status);
  });
}

async function removeBankAccount() {
  return fetch('/api/user/account', {
    method: 'DELETE'
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    throw Error(response.status);
  });
}
