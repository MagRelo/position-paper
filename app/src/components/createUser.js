import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserSignup extends Component {
  state = {
    name: '',
    email: '',
    password: '',

    formAlert: false,
    formError: false,
    formSuccess: false,
    formSubmitting: false,
    formMessage: ''
  };

  async handleSubmit(event) {
    event.preventDefault();
    // set loading state
    this.setState({
      formSubmitting: true
    });

    // get and format form data
    const formData = new FormData(event.target);
    var object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    var json = JSON.stringify(object);

    try {
      await fetch('/api/register/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: json
      }).then(response => response.json());

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

  resetForm() {
    this.setState({
      formAlert: false,
      formError: false,
      formSuccess: false,
      formSubmitting: false,
      formMessage: ''
    });
  }

  alertClass() {
    if (this.state.formError) return 'alert error';
    if (this.state.formSuccess) return 'alert success';
  }

  handleFormChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <form
          name="createForm"
          className="pure-form"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <legend>Signup</legend>

          <fieldset>
            <label htmlFor="name">Name </label>
            <input
              className="pure-input-1"
              type="text"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleFormChange.bind(this)}
            />
            <label htmlFor="signup-email">Email </label>
            <input
              className="pure-input-1"
              type="email"
              id="signup-email"
              name="email"
              value={this.state.newemail}
              onChange={this.handleFormChange.bind(this)}
            />
            <label htmlFor="signup-password">Password </label>
            <input
              className="pure-input-1"
              type="password"
              id="signup-password"
              name="password"
              value={this.state.newPassword}
              onChange={this.handleFormChange.bind(this)}
            />
          </fieldset>

          <hr />

          <button className="pure-button pure-button-primary">Signup</button>

          {this.state.formSubmitting ? (
            <span style={{ fontSize: 'smaller', marginLeft: '1em' }}>
              Submitting...
            </span>
          ) : null}

          {this.state.formAlert ? (
            <div className={this.alertClass()}>
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

const mapStateToProps = state => {
  return {
    web3Ready: state.web3.web3Ready,
    networkReady: state.web3.networkReady,
    showTip: state.web3.showTip,
    selectedAccount: state.account.selectedAccount,
    accountsReady: state.account.accountsReady,
    contractsReady: state.contracts.contractsReady
  };
};

export default connect(
  mapStateToProps,
  null
)(UserSignup);
