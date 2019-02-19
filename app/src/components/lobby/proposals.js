import React, { Component } from 'react';

class ProposalsList extends Component {
  render() {
    return (
      <div className="proposals">
        <h3>Proposals</h3>

        <div className="list">
          <ul>
            {this.props.proposals.map(position => {
              return (
                <li className="list-item" key={position}>
                  {position}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="info">
          <p>four details</p>
        </div>
      </div>
    );
  }
}

export default ProposalsList;
