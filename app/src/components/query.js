import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Graph } from 'react-d3-graph';

import LinksList from './linksTable';
import LinkGraph from './queryLinkGraph';

class Query extends Component {
  state = { contactOpen: false, linkOpen: false, links: [] };

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
        bonus: query.data.bonus,
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
        <div
          style={{
            border: 'solid 1px',
            padding: '0 1em',
            borderRadius: '1em'
          }}
        >
          <h2>{this.state.title}</h2>
          <p>Bonus: {this.state.bonus}</p>
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
