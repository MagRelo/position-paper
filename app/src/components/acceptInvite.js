import React, { Component } from 'react';
import { connect } from 'react-redux';

import store from 'state/store';

// import Select from 'react-select';

class CreatePortfolio extends Component {
  state = {
    groupName: '',
    adminName: '',
    adminAddress: '',
    minDeposit: 0,
    contractAddress: '',
    whitelistStatus: '',
    deposit: 0,

    formAlert: false,
    formError: false,
    formSuccess: false,
    formSubmitting: false,
    formMessage: ''
  };

  componentDidMount() {
    // get account
    // const selectedAccount = store.getState().account.selectedAccount;
    // get contract address
    // load info from server(?)
    // check whitelist()
  }

  componentDidUpdate() {
    // watch for address change
  }

  async handleSubmit(event) {
    event.preventDefault();

    // set loading state
    this.setState({
      formSubmitting: true
    });

    // Need to get portfolio address and update contract object...
    const contract = store.getState().contracts.portfolio;

    // check whitelist?

    try {
      const reciept = await contract.methods.memberRegister().send({
        from: this.state.selectedAccount,
        value: this.state.deposit
      });

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
      <div>
        <h1>Accept Invitation</h1>
        <p>(Group Info)</p>
        <p>(Members)</p>

        <form
          name="autoForm"
          className="pure-form"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <legend>Join</legend>
          <fieldset>
            <label htmlFor="deposit">Deposit</label>
            <input
              className="pure-input"
              type="number"
              name="deposit"
              id="deposit"
            />
          </fieldset>

          <button className="pure-button pure-button-primary">Join</button>

          {this.state.formSubmitting ? (
            <span style={{ fontSize: 'smaller', marginLeft: '1em' }}>
              Waiting for MetaMask...
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
    accountsReady: state.account.accountsReady,
    contractsReady: state.contracts.contractsReady
  };
};

export default connect(
  mapStateToProps,
  null
)(CreatePortfolio);
