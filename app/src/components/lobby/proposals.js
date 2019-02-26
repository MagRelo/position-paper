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
              <div key={proposal.groupproposalid} className="list-item">
                <p>
                  Move {proposal.quantity * 100}%{' of '}
                  {proposal.fromasset} to {proposal.toasset}
                </p>
                <p>
                  Votes Cast: {proposal.totalVotes || 'x'} of{' '}
                  {proposal.totalMembers || 'y'}
                </p>

                <p>Vote:</p>

                <form action="" className="pure-form vote-form">
                  <button
                    type="button"
                    className="pure-button pure-button-primary"
                    onClick={this.voteOnProposal.bind(
                      this,
                      proposal.groupproposalid,
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
                      proposal.groupproposalid,
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
