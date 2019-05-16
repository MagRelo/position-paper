import React, { Component } from 'react';
import { connect } from 'react-redux';

// import store from 'state/store';
import Header from './header';

class UserSignup extends Component {
  state = {
    name: '',

    formAlert: false,
    formError: false,
    formSuccess: false,
    formSubmitting: false,
    formMessage: ''
  };

  componentDidMount() {
    // fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USD')
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(data => {
    //     this.setState({
    //       exchangeRate: parseInt(data[0].price_usd, 10)
    //     });
    //   });
    // if (this.props.selectedAccount) {
    //   this.setState({ newMemberAddress: this.props.selectedAccount });
    // }
  }
  componentDidUpdate(prevState) {
    // if (this.props.selectedAccount !== prevState.selectedAccount) {
    //   this.setState({ newMemberAddress: this.props.selectedAccount });
    // }
  }

  async handleSubmit(event) {
    event.preventDefault();

    // const contract = store.getState().contracts.portfolioFactory;
    // const selectedAccount = store.getState().account.selectedAccount;

    // set loading state
    this.setState({
      formSubmitting: true
    });

    try {
      // const platformAddress = '0x66414e903305Ff1E9dD8266AEDb359A9773236FC';
      // const reciept = await contract.methods
      //   .createPortfolio(
      //     platformAddress,
      //     this.state.memberList.map(member => {
      //       return member.address;
      //     })
      //   )
      //   .send({
      //     from: selectedAccount
      //   });

      // const event = reciept.events.NewContract;
      // const deployedAt = event.returnValues.deployedAt;

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
        <Header />
        <h2>New User Signup</h2>
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
            <legend>Private Information</legend>
            <label htmlFor="name">Email </label>
            <input
              className="pure-input-1"
              type="email"
              id="email"
              name="email"
              value={this.state.email}
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
