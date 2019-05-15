import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './header';

class LandingPage extends Component {
  state = { accounts: null };

  render() {
    return (
      <div>
        <Header />
        <h2>FAQ</h2>
        <div className="row row-3">
          <div>
            <h3>Expand trading options</h3>
            <ul>
              <li>Loans (Dharma, Maker)</li>
              <li>Sports, Weather, Politics (Augur)</li>
            </ul>
          </div>
          <div>
            <h3>Expand UX</h3>
            <ul>
              <li>Portfolio tracking</li>
              <li>Tax compliance reports</li>
              <li>Notifications</li>
              <li>Activity Feeds</li>
              <li>Social</li>
            </ul>
          </div>
          <div>
            <h3>Gamify Participation</h3>
            <p>
              Create a new type of group where the members can adjust member
              shares based on:
            </p>
            <ul>
              <li>activity (attendance, # of proposals, etc)</li>
              <li>curation (popularity of proposals)</li>
              <li>performance (outcome of proposals)</li>
            </ul>
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
)(LandingPage);
