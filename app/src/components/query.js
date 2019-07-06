import React, { Component } from 'react';

import LinksList from './queryLinksTable';
import LinkGraph from './queryLinkGraph';
import ResponseList from './queryResponseTable';

class Query extends Component {
  state = { contactOpen: false, linkOpen: false, links: [], responses: [] };

  formatCurrency(input) {
    if (typeof input === 'number') {
      return input.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      });
    }
    return '';
  }

  async componentDidMount() {
    // get linkId from URL
    const linkId = this.props.match.params.linkId;

    // get position data
    const response = await fetch('/api/query/' + linkId);
    if (response.status === 200) {
      const query = await response.json();

      // console.log(query);

      this.setState({
        title: query.title,
        bonus: query.bonus,
        description: query.data.description,
        links: query.links,
        responses: query.responses
      });
    } else {
      console.log('not found', response.status);
    }
  }

  render() {
    return (
      <div>
        <div className="row row-5-3">
          <div>
            <div className="panel">
              <h2>{this.state.title}</h2>
              <p>Bonus: {this.formatCurrency(this.state.bonus)}</p>
              <p>Description: {this.state.description}</p>
            </div>

            <h3>Links</h3>
            <LinksList links={this.state.links} />
            <LinkGraph links={this.state.links} />
          </div>

          <div>
            <h3>Responses</h3>
            <ResponseList responses={this.state.responses} />
          </div>
        </div>
      </div>
    );
  }
}

export default Query;
