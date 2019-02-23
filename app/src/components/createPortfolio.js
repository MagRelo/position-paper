import React, { Component } from 'react';
import { connect } from 'react-redux';

import ethereum_address from 'ethereum-address';
import web3 from 'web3';

import Header from './header';

import store from 'state/store';

class CreatePortfolio extends Component {
  state = {
    exchangeRate: 0,
    platformFee: 0.0125,
    minDeposit: 1,

    groupName: '',

    memberList: [],
    newMember: '',

    formAlert: false,
    formError: false,
    formSuccess: false,
    formSubmitting: false,
    formMessage: ''
  };

  componentDidMount() {
    fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USD')
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          exchangeRate: parseInt(data[0].price_usd, 10)
        });
      });

    if (this.props.selectedAccount) {
      this.addMember(this.props.selectedAccount);
    }
  }
  componentDidUpdate(prevState) {
    if (this.props.selectedAccount !== prevState.selectedAccount) {
      this.addMember(this.props.selectedAccount);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    const contract = store.getState().contracts.portfolioFactory;
    const selectedAccount = store.getState().account.selectedAccount;

    // set loading state
    this.setState({
      formSubmitting: true
    });

    // const memberParam = memberList.map(member => {});

    try {
      const platformAddress = '0x66414e903305Ff1E9dD8266AEDb359A9773236FC';
      const reciept = await contract.methods
        .createPortfolio(platformAddress, this.state.memberList)
        .send({
          from: selectedAccount
        });

      const event = reciept.events.NewContract;
      const deployedAt = event.returnValues.deployedAt;

      await fetch('group/' + deployedAt, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contractAddress: deployedAt,
          name: this.state.groupName,
          minDeposit: this.state.minDeposit,
          members: this.state.memberList
        })
      }).then(response => response.json());

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

  addMember(member) {
    const tempArray = this.state.memberList;
    tempArray.push(member);

    this.setState({
      newMember: '',
      memberList: tempArray
    });
  }
  removeMember(index) {
    let tempArray = this.state.memberList;
    tempArray.splice(index, 1);
    this.setState({
      memberWhitelist: tempArray
    });
  }

  validMemberAddress(address) {
    const found = this.state.memberList.find(item => {
      return item === address;
    });

    return ethereum_address.isAddress(address) && !found;
  }
  round(value, places) {
    places = places || 4;
    return Number(Math.round(value + 'e' + places) + 'e-' + places);
  }
  formatEth(ether) {
    return (
      'Ξ' +
      this.round(ether, 5) +
      ' ($' +
      this.round(this.state.exchangeRate * ether) +
      ')'
    );
  }

  render() {
    return (
      <div>
        <Header />
        <h2>Create a New Group</h2>
        <form
          name="autoForm"
          className="pure-form"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <legend>Group Information</legend>

          <fieldset>
            <label htmlFor="groupName">Group Name </label>
            <input
              className="pure-input-1"
              type="text"
              id="groupName"
              name="groupName"
              onChange={this.handleFormChange.bind(this)}
            />
            <label htmlFor="minDeposit">Member Deposit</label>
            <input
              className="pure-input-1-4"
              type="number"
              id="minDeposit"
              name="minDeposit"
              value={this.state.minDeposit}
              onChange={this.handleFormChange.bind(this)}
            />
            <span> Min: {this.formatEth(this.state.minDeposit)} </span>
          </fieldset>

          <legend>Group Members</legend>

          <p>
            Only members will be able to deposit and participate. You can add
            and remove members at any time.
          </p>

          <div
            style={{
              padding: '1em',
              marginBottom: '1em'
            }}
          >
            <div />

            <ul style={{ padding: 0 }}>
              {this.state.memberList.map((item, index) => {
                return (
                  <li
                    style={{ listStyle: 'none', marginBottom: '0.5em' }}
                    key={index}
                  >
                    <span style={{ minWidth: '50%', display: 'inline-block' }}>
                      {item}
                    </span>
                    <button
                      className="pure-button pure-button-primary"
                      style={{ marginLeft: '0.5em' }}
                      type="button"
                      disabled={item === this.props.selectedAccount}
                      onClick={this.removeMember.bind(this, index)}
                    >
                      ✗
                    </button>
                  </li>
                );
              })}
            </ul>

            <div>
              <input
                className="pure-input-1-2"
                type="text"
                name="newMember"
                value={this.state.newMember}
                onChange={this.handleFormChange.bind(this)}
              />

              <button
                className="pure-button pure-button-primary"
                style={{ marginLeft: '0.5em' }}
                type="button"
                disabled={!this.validMemberAddress(this.state.newMember)}
                onClick={this.addMember.bind(this, this.state.newMember)}
              >
                Add Member
              </button>
            </div>
          </div>

          <legend>Deposit & Create Group</legend>
          <fieldset>
            <p>Member Deposit: {this.formatEth(this.state.minDeposit)}</p>
            <p>Platform Fee: 1.25%</p>
          </fieldset>

          <button className="pure-button pure-button-primary">
            Create Group
          </button>

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
    selectedAccount: state.account.selectedAccount,
    accountsReady: state.account.accountsReady,
    contractsReady: state.contracts.contractsReady
  };
};

export default connect(
  mapStateToProps,
  null
)(CreatePortfolio);
