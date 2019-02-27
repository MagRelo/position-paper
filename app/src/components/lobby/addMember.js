import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddMember extends Component {
  state = {};

  // Vote form
  async executeTrade(proposalId, inFavor) {
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

  render() {
    return (
      <section className="">
        <p>Success!</p>

        <form action="" className="pure-form">
          <button
            type="button"
            className="pure-button pure-button-primary"
            onClick={this.executeTrade.bind(
              this,
              this.props.groupproposalid,
              true
            )}
          >
            Execute
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
