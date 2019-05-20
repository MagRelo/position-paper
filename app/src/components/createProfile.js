import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreatePortfolio extends Component {
  state = {
    name: 'test',
    linkedin: 'linked',
    github: 'git',
    twitter: 'twit',
    medium: 'meitt',
    email: 'm@aol.com',
    salary: 10000,

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

    // submit
    try {
      const response = await fetch('api/register/profile', {
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
        formMessage: 'Success! Redirecting to ' + response.linkId + '...'
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
        <h2>Create a New Profile</h2>
        <form
          name="createForm"
          className="pure-form"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <legend>Profile Information</legend>

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
          </fieldset>

          <fieldset>
            <div className="row row-2">
              <div>
                <label htmlFor="name">LinkedIn </label>
                <input
                  className="pure-input-1"
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  value={this.state.linkedin}
                  onChange={this.handleFormChange.bind(this)}
                />

                <label htmlFor="name">Github </label>
                <input
                  className="pure-input-1"
                  type="text"
                  id="github"
                  name="github"
                  value={this.state.github}
                  onChange={this.handleFormChange.bind(this)}
                />
              </div>
              <div>
                <label htmlFor="name">Twitter </label>
                <input
                  className="pure-input-1"
                  type="text"
                  id="twitter"
                  name="twitter"
                  value={this.state.twitter}
                  onChange={this.handleFormChange.bind(this)}
                />

                <label htmlFor="name">Medium </label>
                <input
                  className="pure-input-1"
                  type="text"
                  id="medium"
                  name="medium"
                  value={this.state.medium}
                  onChange={this.handleFormChange.bind(this)}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Private Information</legend>

            <div className="row row-2">
              <div>
                <label htmlFor="name">Email </label>
                <input
                  className="pure-input-1"
                  type="email"
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleFormChange.bind(this)}
                />
              </div>

              <div>
                <label htmlFor="name">Approximate Salary </label>
                <input
                  className="pure-input-1"
                  type="number"
                  id="salary"
                  name="salary"
                  value={this.state.salary}
                  onChange={this.handleFormChange.bind(this)}
                />
              </div>
            </div>
          </fieldset>

          <hr />

          <button className="pure-button pure-button-primary" type="submit">
            Create Profile
          </button>

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
)(CreatePortfolio);
