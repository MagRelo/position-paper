import React, { Component } from 'react';
import { connect } from 'react-redux';

import VoteOnProposal from 'components/lobby/voteOnProposal';
import ExecuteTrade from 'components/lobby/executeTrade';

// isOpen - vote form
// !isOpen && !isPassed - no trade, clear
// !isOpen && isPassed && !isExecuted - execute trade form
// !isOpen && isPassed && isExecuted - trade history

class ProposalsList extends Component {
  render() {
    return (
      <section className="proposals">
        <h3>Vote on Proposals</h3>

        <div className="list">
          <div className="list-container">
            {this.props.proposals.map(proposal => {
              return (
                <div key={proposal.groupproposalid} className="list-item">
                  <p>
                    Move {proposal.quantity * 100}%{' of '}
                    {proposal.fromasset} to {proposal.toasset}
                  </p>

                  {proposal.isopen ? (
                    <VoteOnProposal groupkey={this.props.groupkey} />
                  ) : (
                    <ExecuteTrade groupkey={this.props.groupkey} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    proposals: state.lobby.proposals,
    selectedAccount: state.account.selectedAccount
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProposalsList);
