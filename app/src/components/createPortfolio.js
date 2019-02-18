import React, { Component } from 'react';
import { connect } from 'react-redux';

import store from 'state/store';

import Select from 'react-select';

class CreatePortfolio extends Component {
  state = {
    groupName: '',
    minInvestment: 0,

    playerList: [],
    newPlayer: '',

    formAlert: false,
    formError: false,
    formSuccess: false,
    formSubmitting: false,
    formMessage: ''
  };

  async handleSubmit(event) {
    event.preventDefault();

    const contract = store.getState().contracts.portfolioFactory;
    const selectedAccount = store.getState().account.selectedAccount;

    // set loading state
    this.setState({
      formSubmitting: true
    });

    // get portfolio params
    // platform
    // admin (selectedAccount)
    // Admin Name

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

  addPlayer() {
    const tempArray = this.state.playerList;
    tempArray.push(this.state.newPlayer);

    this.setState({
      newPlayer: '',
      playerList: tempArray
    });
  }
  removePlayer(index) {
    let tempArray = this.state.playerList;
    tempArray.splice(index, 1);
    this.setState({
      playerWhitelist: tempArray
    });
  }

  validPlayerAddress(address) {
    // return ethereum_address.isAddress(address)
    return true;
  }

  render() {
    return (
      <div>
        <h2>Create a New Group</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          temporibus sunt soluta ea, nihil numquam consectetur, iusto expedita
          pariatur tempora quam necessitatibus quia ab earum laboriosam,
          adipisci in? Nesciunt, doloribus!
        </p>
        <form
          name="autoForm"
          className="pure-form"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <legend>Group Information</legend>

          <fieldset>
            <label htmlFor="groupName">Group Name </label>
            <input className="pure-input-1" type="text" id="groupName" />
          </fieldset>

          <fieldset>
            <label htmlFor="minDeposit">Minimum Deposit </label>
            <input className="pure-input-1-4" type="number" id="minDeposit" />
          </fieldset>

          <legend>Members</legend>

          <p>
            Add each members's address. Only listed members will be able to
            deposit and participate. You can add and remove players at any time.
          </p>

          <div style={{ padding: '1em', marginBottom: '1em' }}>
            <ul style={{ padding: 0 }}>
              {this.state.playerList.map((item, index) => {
                return (
                  <li
                    style={{ listStyle: 'none', marginBottom: '0.5em' }}
                    key={index}
                  >
                    <div className="game-panel white-bg">
                      <button
                        className="pure-button"
                        style={{ float: 'right' }}
                        type="button"
                        onClick={this.removePlayer.bind(this, index)}
                      >
                        ✗
                      </button>
                      <div style={{ padding: '.5em 1em .5em 0' }}>{item}</div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div>
              <input
                className="pure-input-1-2"
                type="text"
                name="newPlayer"
                value={this.state.newPlayer}
                onChange={this.handleFormChange.bind(this)}
              />

              <button
                className="pure-button pure-button-primary"
                style={{ marginLeft: '0.5em' }}
                type="button"
                disabled={!this.validPlayerAddress(this.state.newPlayer)}
                onClick={this.addPlayer.bind(this)}
              >
                {' '}
                Add Player
              </button>
            </div>
          </div>

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
    accountsReady: state.account.accountsReady,
    contractsReady: state.contracts.contractsReady
  };
};

export default connect(
  mapStateToProps,
  null
)(CreatePortfolio);
