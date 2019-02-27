import React, { Component } from 'react';
import { connect } from 'react-redux';

class VoteOnProposal extends Component {
  state = {
    userHasVoted: !(this.props.userVote === null)
    // isOpen - vote form
    // !isOpen && !isPassed - no trade, clear
    // !isOpen && isPassed && !isExecuted - execute trade form
    // !isOpen && isPassed && isExecuted - trade history
  };

  componentDidUpdate(prev) {
    if (prev.userVote !== this.props.userVote) {
      this.setState({ userHasVoted: !(this.props.userVote === null) });
    }
  }

  // Vote form
  async voteOnProposal(proposalId, inFavor) {
    await fetch('/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        groupKey: this.props.groupKey,
        userKey: this.props.userKey,
        proposalId: proposalId,
        inFavor: inFavor
      })
    });
  }

  setActiveVoteClass(buttonType, userVote) {
    return buttonType === userVote
      ? 'pure-button pure-button-primary'
      : 'pure-button';
  }

  render() {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto' }}>
        <p>
          Votes: {this.props.totalVotes || 'x'} /{' '}
          {this.props.totalMembers || 'y'}
        </p>
        <form action="" className="pure-form vote-form">
          <button
            type="button"
            className={this.setActiveVoteClass(true, this.props.userVote)}
            onClick={this.voteOnProposal.bind(
              this,
              this.props.proposalId,
              true
            )}
          >
            Yes
          </button>
          <button
            type="button"
            className={this.setActiveVoteClass(false, this.props.userVote)}
            onClick={this.voteOnProposal.bind(
              this,
              this.props.proposalId,
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
    userKey: state.account.selectedAccount,
    groupKey: state.lobby.group.groupkey
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteOnProposal);
