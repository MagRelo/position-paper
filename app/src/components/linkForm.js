import React, { Component } from 'react';
import { connect } from 'react-redux';

// import store from 'state/store';

class LinkForm extends Component {
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

    // set loading state
    this.setState({
      formSubmitting: true
    });

    try {
      const newLink = await fetch('/api/link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          parentLinkId: this.props.parentLinkId,
          userId: '123'
        })
      }).then(response => response.json());

      console.log(newLink);
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
          name="newLinkForm"
          className="pure-form"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <legend>Create Referral Link</legend>

          <button className="pure-button pure-button-primary">
            Create Link
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

          <hr />

          <p>links and stuff </p>
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
)(LinkForm);
