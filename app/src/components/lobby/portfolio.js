import React, { Component } from 'react';

class PortfolioList extends Component {
  state = { accounts: null };

  render() {
    return (
      <div className="portfolio">
        <h3>Portfolio</h3>
        <div className="list">
          <ul>
            {this.props.portfolio.map(position => {
              return <li key={position}>{position}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default PortfolioList;
