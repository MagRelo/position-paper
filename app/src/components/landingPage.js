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
        <p>Incentive-compatible investment club</p>

        <ol>
          <li>Create group and the fund contract</li>
          <li>
            Play curation tournaments to build your portfolio. When the game
            closes the trades will auto-execute.
          </li>
          <li>Close the group at any time and distribute the proceeds</li>
        </ol>

        <h2>Curation Tournament</h2>

        <ul>
          <li>Value </li>
          <li>Close</li>
        </ul>
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
