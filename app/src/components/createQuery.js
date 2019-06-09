import React, { Component } from 'react';
import { connect } from 'react-redux';

// import store from 'state/store';
// import Header from './header';

class CreateQuery extends Component {
  state = {
    name: '',

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

    try {
      await fetch('group/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name
        })
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
        <h2>Create a New Position</h2>
        <form
          name="createForm"
          className="pure-form"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <legend>Query Information</legend>

          <fieldset>
            <div className="row row-2">
              <div>
                <label htmlFor="name">Title </label>
                <input
                  className="pure-input-1"
                  type="text"
                  id="name"
                  name="name"
                  value={this.state.name}
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

            <label htmlFor="name">Description </label>
            <input
              className="pure-input-1"
              type="text"
              id="description"
              name="description"
              value={this.state.salary}
              onChange={this.handleFormChange.bind(this)}
            />
          </fieldset>

          <hr />

          <button className="pure-button pure-button-primary">
            Create Query
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
)(CreateQuery);
