import React, { Component } from 'react';

import Select from 'react-select';

class ProposalsList extends Component {
  state = { selectedProposal: null, proposalAmount: 0 };

  componentDidMount() {
    if (!this.state.selectedProposal && this.props.proposals[0]) {
      this.selectProposal(this.props.proposals[0]);
    }
  }

  selectProposal(item) {
    this.setState({ selectedProposal: item });
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
                    this.state.selectedProposal === item ? ' selected' : ''
                  }
                  key={item}
                  onClick={this.selectProposal.bind(this, item)}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="info">
          {this.state.selectedProposal ? (
            <div>{this.state.selectedProposal}</div>
          ) : (
            <div>none</div>
          )}
        </div>

        <form action="" className="pure-form">
          <label htmlFor="">New Proposal:</label>
          <Select placeholder="Select Quantity" />
          <Select placeholder="Select Asset" />

          <label htmlFor=""> => </label>

          <Select placeholder="Select Asset" />

          <button className="pure-button pure-button-primary" onClick={null}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default ProposalsList;
