import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Loader from 'components/loader';
// import AutoForm from 'components/autoForm';

class LandingPage extends Component {
  state = { accounts: null };

  render() {
    return (
      <div>
        <h1>karata</h1>
        <p>Investment Clubs</p>

        <h2>Roadmap</h2>

        <h3>v0.1: basic infrastructure</h3>
        <ol>
          <li>Create a club and invite members</li>
          <li>Add funds to your portfolio smart contract</li>
          <li>Use our tools to research and discuss investments</li>
          <li>Execute trades through decentralized exchanges</li>
          <li>Close the group at any time and distribute the proceeds</li>
        </ol>

        <h3>v0.2: Gamify</h3>
        <ol>
          <li>
            Allow platform to re-balance member shares based on activity
            (attendance, # of proposals, etc)
          </li>
          <li>
            Allow platform to re-balance member shares based on curation
            tournament (popularity of proposals)
          </li>
          <li>
            Allow platform to re-balance member shares based on performance
            (outcome of proposals)
          </li>

          <li>Social integration</li>
        </ol>
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
)(LandingPage);
