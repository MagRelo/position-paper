import React, { Component } from 'react';

import web3 from 'web3';

import store from 'state/store';

class MembersList extends Component {
  state = { accounts: null };

  async deposit() {
    const contract = store.getState().lobby.portfolioContract;
    const selectedAccount = store.getState().account.selectedAccount;

    const receipt = await contract.methods
      .memberDeposit()
      .send({ from: selectedAccount, value: web3.utils.toWei('1') });
  }

  render() {
    return (
      <form className="pure-form">
        <button
          type="button"
          className="pure-button pure-button-primary"
          onClick={this.deposit.bind(this)}
        >
          Deposit 1ETH
        </button>
      </form>
    );
  }
}

export default MembersList;
