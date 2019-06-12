import React, { Component } from 'react';
import { connect } from 'react-redux';

import LinksList from './queryLinksTable';
import LinkGraph from './queryLinkGraph';

class Query extends Component {
  state = { contactOpen: false, linkOpen: false, links: [] };

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
        links: query.links
      });
    } else {
      console.log('not found', response.status);
    }
  }

  render() {
    return (
      <div>
        <h2>Query</h2>
        <div className="panel">
          <h2>{this.state.title}</h2>
          <p>Bonus: {this.formatCurrency(this.state.bonus)}</p>
          <p>Description: {this.state.description}</p>
        </div>

        <h2>Links</h2>
        <div className="row row-2">
          <div>
            <LinksList links={this.state.links} />
          </div>

          <div>
            <LinkGraph links={this.state.links} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Query);
