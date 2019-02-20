import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

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
  }

  // Vote form
  voteOnProposal(proposalId, inFavor) {
    console.log('vote', proposalId, inFavor);
    // sign?
  }

  render() {
    return (
      <div className="proposals">
        <h3>Proposals</h3>

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
          <span>
            Trade {this.state.selectedProposal.quantity * 100}%{' '}
            {this.state.selectedProposal.from.name} to{' '}
            {this.state.selectedProposal.to.name}
          </span>

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

        <form action="" className="pure-form proposal-form">
          <label htmlFor="">Trade:</label>
          <Select
            placeholder="Quantity"
            name="quantity"
            id="quantity"
            options={this.props.quantities}
            onChange={this.onSelectAsset.bind(this)}
          />

          <p>of</p>

          <Select
            placeholder="Current Asset"
            name="currentAsset"
            id="currentAsset"
            options={this.props.portfolio}
            onChange={this.onSelectAsset.bind(this)}
          />

          <p>for</p>

          <Select
            placeholder="New Asset"
            name="newAsset"
            id="newAsset"
            options={this.props.availableAssets}
            onChange={this.onSelectAsset.bind(this)}
          />

          <button
            type="button"
            className="pure-button pure-button-primary"
            onClick={this.submitProposal.bind(this)}
          >
            Add Proposal
          </button>
        </form>
      </div>
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProposalsList);
