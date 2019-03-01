import React, { Component } from 'react';

import MarketGraph from 'components/lobby/marketChart';

class PortfolioHistory extends Component {
  state = { graphData: [] };

  async getData() {
    const response = await fetch(this.props.item.messariLink).then(response =>
      response.json()
    );

    if (response.status === 200) {
      this.setState({
        loaded: true,
        name: response.data.name,
        symbol: response.data.symbol,
        tagline: response.data.tagline,
        links: response.data.relevant_resources
      });
    } else {
      this.setState({
        loaded: false,
        error: response.status.error_message
      });
    }
  }

  render() {
    return (
      <section className="history">
        <h3>History</h3>
        <MarketGraph />
      </section>
    );
  }
}

export default PortfolioHistory;
