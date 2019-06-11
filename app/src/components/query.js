import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Graph } from 'react-d3-graph';

const graphOptions = {
  nodeHighlightBehavior: true,
  node: {
    color: '#0079db',
    size: 320,
    highlightStrokeColor: '#00a96e'
  },
  link: {
    highlightColor: '#00a96e'
  }
};

class Profile extends Component {
  state = { contactOpen: false, linkOpen: false, name: '' };

  async componentDidMount() {
    // get linkId from URL
    const linkId = this.props.match.params.linkId;

    // get position data
    const response = await fetch('/api/query/' + linkId);
    if (response.status === 200) {
      const query = await response.json();

      // console.log(query);

      this.setState({
        name: query.data.name,
        bonus: query.data.bonus,
        description: query.data.description,
        graphData: query.graphData
      });
    } else {
      console.log('not found', response.status);
    }
  }

  render() {
    return (
      <div>
        <div>
          <h2>{this.state.title}</h2>
          <p>Bonus: {this.state.bonus}</p>
          <p>Description: {this.state.description}</p>
        </div>

        <div>
          {this.state.graphData ? (
            <Graph
              id="graph-id"
              data={this.state.graphData}
              config={graphOptions}
              directed={true}
            />
          ) : null}
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
)(Profile);
