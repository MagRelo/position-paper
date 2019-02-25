import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from 'react-accessible-accordion';

import InfoPanel from './infoPanel';

class ProposalsList extends Component {
  // Vote form
  async voteOnProposal(proposalId, inFavor) {
    const response = await fetch('/vote', {
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
          <Accordion>
            {this.props.proposals.map(proposal => {
              return (
                <AccordionItem key={proposal.groupProposalId}>
                  <AccordionItemTitle>
                    <p>
                      Move {proposal.quantity * 100}%{' of '}
                      {proposal.fromAsset} to {proposal.toAsset}
                    </p>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr'
                      }}
                    >
                      {/* <InfoPanel item={proposal.from} />
                      <InfoPanel item={proposal.to} /> */}

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
                          Vote 'Yes'
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
                          Vote 'No'
                        </button>
                      </form>
                    </div>
                  </AccordionItemBody>
                </AccordionItem>
              );
            })}
          </Accordion>
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
