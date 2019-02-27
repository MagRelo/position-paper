import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExecuteTrade extends Component {
  state = {
    // isOpen - vote form
    // !isOpen && !isPassed - no trade, clear
    // !isOpen && isPassed && !isExecuted - execute trade form
    // !isOpen && isPassed && isExecuted - trade history
  };

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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedAccount: state.account.selectedAccount
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExecuteTrade);
