import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { submitProposal, submitVote } from './sockets';
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

  //  Proposal form
  onSelectAsset(option) {
    this.setState({
      [option.value.formFeild]: option.value
    });
  }
  submitProposal() {
    console.log({
      quantity: this.state.quantity.number,
      currentAsset: this.state.currentAsset.name,
      newAsset: this.state.newAsset.name
    });

    this.props.submitProposal(
      this.state.quantity.number,
      this.state.currentAsset.name,
      this.state.newAsset.name
    );
  }

  // Vote form
  voteOnProposal(proposalId, inFavor) {
    console.log('vote', proposalId, inFavor);
    // sign?
  }

  render() {
    return (
      <section className="proposals">
        <h3>Active Proposals</h3>

        <div className="list">
          <ul>
            {this.props.proposals.map(item => {
              return (
                <li
                  className={
                    this.state.selectedProposalId === item.id ? ' selected' : ''
                  }
                  key={item.id}
                  onClick={this.selectProposal.bind(this, item)}
                >
                  <span>
                    Trade {item.quantity * 100}% {item.from.name} to{' '}
                    {item.to.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          className="info"
          style={{
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto'
          }}
        >
          <h3>
            Proposal: Trade {this.state.selectedProposal.quantity * 100}%
            {' of '}
            {this.state.selectedProposal.from.name} to{' '}
            {this.state.selectedProposal.to.name}
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr'
            }}
          >
            <InfoPanel item={this.state.selectedProposal.from} />
            <InfoPanel item={this.state.selectedProposal.to} />
          </div>

          <form action="" className="pure-form vote-form">
            <button
              type="button"
              className="pure-button pure-button-primary"
              onClick={this.voteOnProposal.bind(
                this,
                this.state.selectedProposal.id,
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
                this.state.selectedProposal.id,
                false
              )}
            >
              Vote 'No'
            </button>
          </form>
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
    submitProposal: (quantity, from, to) => {
      submitProposal(quantity, from, to);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProposalsList);
