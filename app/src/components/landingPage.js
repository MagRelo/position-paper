import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
  state = { accounts: null };

  render() {
    return (
      <div>
        <h2>Get Started</h2>
        <div className="row row-2">
          <div>
            <h3>Accept Invite</h3>
            <p>Accept an invitation you have received</p>
            <Link to="/invite" className="pure-button pure-button-primary">
              Accept Invite
            </Link>
          </div>
          <div>
            <h3>Create a New Group</h3>
            <p>Create a group and invite new members</p>
            <Link to="/create" className="pure-button pure-button-primary">
              Create Group
            </Link>
          </div>
        </div>

        <h2>How does it work?</h2>
        <ol>
          <li>Create a group and add members</li>
          <li>
            Each member can add funds to your group's custom portfolio contract
          </li>
          <li>Research and discuss trades in private lobby with chat</li>
          <li>Execute group trades through decentralized exchanges</li>
          <li>Each member's share is secured by the portfolio contract</li>
          <li>Cash out at any time</li>
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
