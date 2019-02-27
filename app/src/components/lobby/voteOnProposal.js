import React, { Component } from 'react';
import { connect } from 'react-redux';

class VoteOnProposal extends Component {
  state = {
    // isOpen - vote form
    // !isOpen && !isPassed - no trade, clear
    // !isOpen && isPassed && !isExecuted - execute trade form
    // !isOpen && isPassed && isExecuted - trade history
  };

  // Vote form
  async voteOnProposal(proposalId, inFavor) {
    await fetch('/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        groupKey: this.props.groupKey,
        userKey: this.props.selectedAccount,
        proposalId: proposalId,
        inFavor: inFavor
      })
    }).then(response => response.json());
  }

  render() {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <p>
          Votes: {this.props.totalVotes || 'x'} /{' '}
          {this.props.totalMembers || 'y'}
        </p>

        <p>Vote: {this.props.userVote ? 'yes' : 'no'}</p>

        <form action="" className="pure-form vote-form">
          <button
            type="button"
            className="pure-button pure-button-primary"
            onClick={this.voteOnProposal.bind(
              this,
              this.props.groupproposalid,
              true
            )}
          >
            Yes
          </button>
          <button
            type="button"
            className="pure-button pure-button-primary"
            onClick={this.voteOnProposal.bind(
              this,
              this.props.groupproposalid,
              false
            )}
          >
            No
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
)(VoteOnProposal);
