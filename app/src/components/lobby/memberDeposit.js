import React, { Component } from 'react';

import web3 from 'web3';

import store from 'state/store';

class MembersList extends Component {
  state = {
    accounts: null,
    formAlert: false,
    formError: false,
    formSuccess: false,
    formSubmitting: false,
    formMessage: ''
  };

  async deposit() {
    this.setState({ formSubmitting: true });

    try {
      const contract = store.getState().lobby.portfolioContract;
      const selectedAccount = store.getState().account.selectedAccount;

      const receipt = await contract.methods
        .memberDeposit()
        .send({ from: selectedAccount, value: web3.utils.toWei('1') });

      this.setState({ formSubmitting: false });
    } catch (error) {
      this.setState({ formSubmitting: false });
    }
  }

  render() {
    return (
      <form className="pure-form">
        <button
          type="button"
          className="pure-button pure-button-primary"
          onClick={this.deposit.bind(this)}
        >
          {this.state.formSubmitting ? (
            <div className="spinner">
              <div className="bounce1" />
              <div className="bounce2" />
              <div className="bounce3" />
            </div>
          ) : (
            <span>Deposit 1ETH</span>
          )}
        </button>
      </form>
    );
  }
}

export default MembersList;
