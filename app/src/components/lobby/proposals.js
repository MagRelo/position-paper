import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProposalsList extends Component {
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
      <section className="proposals">
        <h3>Vote on Proposals</h3>

        <div className="list">
          {this.props.proposals.map(proposal => {
            return (
              <div key={proposal.groupProposalId} className="list-item">
                <p>
                  Move {proposal.quantity * 100}%{' of '}
                  {proposal.fromAsset} to {proposal.toAsset}
                </p>
                <p>
                  Votes Cast: {proposal.votes || 'x'} of{' '}
                  {proposal.votesNeeded || 'y'}
                </p>

                <p>Vote:</p>

                <form action="" className="pure-form vote-form">
                  <button
                    type="button"
                    className="pure-button pure-button-primary"
                    onClick={this.voteOnProposal.bind(
                      this,
                      proposal.groupProposalId,
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
                      proposal.groupProposalId,
                      false
                    )}
                  >
                    No
                  </button>
                </form>
              </div>
            );
          })}
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
