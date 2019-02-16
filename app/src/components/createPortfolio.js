import React, { Component } from 'react';
import { connect } from 'react-redux';

import store from 'state/store';

import Select from 'react-select';

class AutoForm extends Component {
  state = {
    name: '',
    inputs: [],
    stateMutability: '',
    formAlert: false,
    formError: false,
    formSuccess: false,
    formSubmitting: false,
    formMessage: ''
  };

  async handleSubmit(event) {
    event.preventDefault();

    const contract = store.getState().contracts[this.props.contract];
    const selectedAccount = store.getState().account.selectedAccount;

    // set loading state
    this.setState({
      formSubmitting: true
    });

    const params = [];

    console.log('params:', ...params);
    try {
      const reciept = await contract.methods[this.props.method](...params).send(
        {
          from: selectedAccount
        }
      );

      this.setState({
        formSuccess: true,
        formAlert: true,
        formSubmitting: false,
        formMessage: 'Success!'
      });

      return console.log(reciept);
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
      <form
        name="autoForm"
        className="pure-form"
        onSubmit={this.handleSubmit.bind(this)}
      >
        <legend>Create contract</legend>

        <fieldset>
          <label htmlFor="">Allocator</label>
          <Select />
        </fieldset>

        <fieldset>
          <label htmlFor="">Amount </label>
          <input type="number" className="pure-input" />
        </fieldset>

        <fieldset>
          <p>Execution Type</p>
          <label htmlFor="manual">
            <input type="radio" id="manual" className="pure-input" />
            Manual
          </label>

          <label htmlFor="mixed">
            <input type="radio" id="mixed" className="pure-input" />
            Mixed
          </label>
          <label htmlFor="auto">
            <input type="radio" id="auto" className="pure-input" />
            Auto
          </label>
        </fieldset>

        <button className="pure-button pure-button-primary">
          {this.state.stateMutability === 'view' ? 'Call' : 'Send'}
        </button>

        {this.state.formSubmitting ? (
          <span style={{ fontSize: 'smaller', marginLeft: '1em' }}>
            Waiting for MetaMask...
          </span>
        ) : null}

        {this.state.formAlert ? (
          <div className={this.alertClass()}>
            <p>{this.state.formMessage}</p>

            <button className="pure-button" onClick={this.resetForm.bind(this)}>
              Ok
            </button>
          </div>
        ) : null}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    web3Ready: state.web3.web3Ready,
    networkReady: state.web3.networkReady,
    showTip: state.web3.showTip,
    accountsReady: state.account.accountsReady,
    contractsReady: state.contracts.contractsReady
  };
};

export default connect(
  mapStateToProps,
  null
)(AutoForm);
