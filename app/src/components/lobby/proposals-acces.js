import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from 'react-accessible-accordion';

import { submitVote } from './sockets';
import InfoPanel from './infoPanel';

class ProposalsList extends Component {
  state = {
    selectedProposalId: 0,
    selectedProposal: {
      from: {},
      to: {}
    },

    currentAsset: null,
    newAsset: null,
    quantity: 0
  };

  componentDidMount() {
    this.selectProposal(this.props.proposals[0]);
  }

  selectProposal(item) {
    this.setState({
      selectedProposalId: item.id,
      selectedProposal: item
    });
  }

  // Vote form
  voteOnProposal(proposalId, inFavor) {
    this.props.submitVote({
      groupId: 'testing',
      selectedAccount: this.props.selectedAccount,
      proposalId: proposalId,
      inFavor: inFavor
    });
  }

  render() {
    return (
      <section className="proposals">
        <h3>Active Proposals</h3>

        <div className="list">
          <Accordion>
            {this.props.proposals.map(proposal => {
              return (
                <AccordionItem key={proposal.id}>
                  <AccordionItemTitle>
                    <h3>
                      Trade {proposal.quantity * 100}%{' of '}
                      {proposal.from.name} to {proposal.to.name}
                    </h3>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    <InfoPanel item={proposal.from} />
                    <InfoPanel item={proposal.to} />

                    <form action="" className="pure-form">
                      <button
                        type="button"
                        className="pure-button pure-button-primary"
                        onClick={this.voteOnProposal.bind(
                          this,
                          proposal.id,
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
                          proposal.id,
                          false
                        )}
                      >
                        Vote 'No'
                      </button>
                    </form>
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
    availableAssets: state.lobby.availableAssets,
    portfolio: state.lobby.portfolio,
    quantities: state.lobby.quantities,
    proposals: state.lobby.proposals
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitVote: (id, inFavor) => {
      submitVote(id, inFavor);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProposalsList);
