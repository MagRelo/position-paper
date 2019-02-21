import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { submitProposal } from './sockets';

class ProposalsList extends Component {
  state = {
    currentAsset: null,
    newAsset: null,
    quantity: 0
  };

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

  render() {
    return (
      <section className="add-proposal">
        <h3>Add a Proposal</h3>

        <form action="" className="pure-form proposal-form">
          <label htmlFor="">Trade:</label>
          <Select
            placeholder="%"
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
