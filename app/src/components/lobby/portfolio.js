import React, { Component } from 'react';

class PortfolioList extends Component {
  state = { accounts: null };

  formatPercentage(allocation) {
    return (allocation * 100).toFixed(2) + '%';
  }

  render() {
    return (
      <section className="portfolio">
        <h3>Portfolio</h3>
        <div className="list">
          <table className="pure-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Allocation</th>
              </tr>
            </thead>
            <tbody>
              {this.props.portfolio.map(position => {
                return (
                  <tr key={position.groupholdingid}>
                    <td>{position.assetcode}</td>
                    <td>{this.formatPercentage(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default PortfolioList;
