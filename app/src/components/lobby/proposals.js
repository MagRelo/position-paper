import React, { Component } from 'react';
import { connect } from 'react-redux';

import VoteOnProposal from 'components/lobby/voteOnProposal';
import ExecuteTrade from 'components/lobby/executeTrade';
import ProposeTrade from 'components/lobby/addProposal';

// isOpen - vote form
// !isOpen && !isPassed - no trade, clear
// !isOpen && isPassed && !isExecuted - execute trade form
// !isOpen && isPassed && isExecuted - trade history

class ProposalsList extends Component {
  render() {
    return (
      <section className="proposals">
        <h3>Proposals</h3>

        <div className="list">
          <ProposeTrade />

          <div className="list-container">
            {this.props.proposals.map(proposal => {
              return (
                <div key={proposal.groupproposalid} className="list-item">
                  <p>
                    Move {proposal.quantity * 100}%{' of '}
                    {proposal.fromasset} to {proposal.toasset}
                  </p>
                  <p>
                    ({proposal.totalVotes || 'x'}/{proposal.totalMembers || 'y'}
                    )
                  </p>

                  {proposal.isopen ? (
                    <VoteOnProposal
                      groupKey={this.props.groupkey}
                      userKey={this.props.selectedAccount}
                      proposalId={proposal.groupproposalid}
                      totalVotes={proposal.totalVotes}
                      totalMembers={proposal.totalMembers}
                      userVote={proposal.userVote}
                    />
                  ) : null}

                  {!proposal.isopen && proposal.ispassed ? (
                    <ExecuteTrade groupkey={this.props.groupkey} />
                  ) : null}

                  {!proposal.isopen && !proposal.ispassed ? (
                    <p>Did not pass, bummer.</p>
                  ) : null}
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
    proposals: state.lobby.proposals
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProposalsList);
