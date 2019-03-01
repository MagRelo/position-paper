import React, { Component } from 'react';
import { connect } from 'react-redux';

import store from 'state/store';

class AddMember extends Component {
  state = {};

  // Vote form
  async addMember(proposalId, inFavor) {
    // await fetch('/vote', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     groupKey: this.props.groupKey,
    //     userKey: this.props.selectedAccount,
    //     proposalId: proposalId,
    //     inFavor: inFavor
    //   })
    // }).then(response => response.json());
  }

  async handleSubmit(event) {
    event.preventDefault();

    const contract = store.getState().contracts.portfolio;
    const selectedAccount = store.getState().account.selectedAccount;

    // set loading state
    this.setState({
      formSubmitting: true
    });

    try {
      const reciept = await contract.methods.createPortfolio().send({
        from: selectedAccount
      });

      const event = reciept.events.NewContract;
      const deployedAt = event.returnValues.deployedAt;

      await fetch('member/' + deployedAt, {
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

  render() {
    return (
      <section className="">
        <p>Success!</p>

        <form action="" className="pure-form">
          <button
            type="button"
            className="pure-button pure-button-primary"
            onClick={this.addMember.bind(this)}
          >
            Add Member
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedAccount: state.account.selectedAccount
  };
};

const mapDispatchToProps = dispatch => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMember);
