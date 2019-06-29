import React, { Component } from 'react';
import PlaidLink from 'components/loginPlaidLink';

class UserSignup extends Component {
  state = {
    formAlert: false,
    formError: false,
    formSuccess: false,
    formSubmitting: false,
    formMessage: '',

    token: '',
    metaData: {},
    bankLabel: ''
  };

  async handleSubmit(event) {
    event.preventDefault();
    // set loading state
    this.setState({
      formSubmitting: true
    });

    // get and format form data
    const formData = new FormData(event.target);
    var formObj = {};
    formData.forEach((value, key) => {
      formObj[key] = value;
    });

    // merge in account tokens
    formObj.token = this.state.token;
    formObj.metaData = this.state.metaData;

    // add tos data
    formObj.tos = {
      date: Math.floor(Date.now() / 1000),
      user_agent: window.navigator.userAgent
    };
    // formObj.tos.ip = '';

    try {
      // createSession
      console.log(formObj);

      await createUser(formObj);
      this.setState({
        formSuccess: true,
        formAlert: true,
        formSubmitting: false,
        formMessage: 'Success!'
      });
    } catch (error) {
      this.setState({
        formError: true,
        formAlert: true,
        formSubmitting: false,
        formMessage: error.message
      });

      return console.log(error);
    }
  }

  getToken(token, metaData) {
    const bankLabel =
      metaData.accounts[0].name + ' – ' + metaData.institution.name + ' ✔';
    this.setState({
      token,
      metaData,
      bankLabel
    });
  }

  resetForm() {
    this.setState({
      formAlert: false,
      formError: false,
      formSuccess: false,
      formSubmitting: false,
      formMessage: ''
    });
  }

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <form
          name="createForm"
          className="pure-form"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <legend>Link Social Accounts</legend>

          <fieldset>
            <div className="row row-2">
              <div>Github</div>
              <div>Twitter</div>
              <div>LinkedIn</div>
              <div>Google</div>
            </div>
          </fieldset>

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
                <input
                  className="pure-input-1"
                  type="date"
                  id="dob"
                  name="dob"
                />
              </div>

              <div>
                <label htmlFor="ssn">Last 4 Digits of SSN </label>
                <input
                  className="pure-input-1"
                  type="text"
                  id="ssn"
                  name="ssn"
                />
              </div>

              <div>
                <label htmlFor="bank">Bank Account</label>
                {this.state.token ? (
                  <p>{this.state.bankLabel}</p>
                ) : (
                  <PlaidLink getToken={this.getToken.bind(this)} />
                )}
              </div>
            </div>

            <label>Terms of Service</label>
            <small>
              Payment processing services for users on Incentive Exchange are
              provided by Stripe and are subject to the Stripe Connected Account
              Agreement, which includes the Stripe Terms of Service
              (collectively, the “Stripe Services Agreement”). By agreeing to
              these terms or continuing to operate as a user on Incentive
              Exchange, you agree to be bound by the Stripe Services Agreement,
              as the same may be modified by Stripe from time to time. As a
              condition of Incentive Exchange enabling payment processing
              services through Stripe, you agree to provide Incentive Exchange
              accurate and complete information about you and your business, and
              you authorize Incentive Exchange to share it and transaction
              information related to your use of the payment processing services
              provided by Stripe.
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

          <hr />

          <button className="pure-button pure-button-primary">Signup</button>

          {this.state.formSubmitting ? (
            <span style={{ fontSize: 'smaller', marginLeft: '1em' }}>
              Submitting...
            </span>
          ) : null}

          {this.state.formAlert ? (
            <div>
              <p>{this.state.formMessage}</p>

              <button
                className="pure-button"
                onClick={this.resetForm.bind(this)}
              >
                Ok
              </button>
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}

export default UserSignup;

async function createUser(formData) {
  return await fetch('/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    throw new Error(response.status);
  });
}
