import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import LobbyImage from 'images/lobby.png';

import Header from './header';

class LandingPage extends Component {
  state = { accounts: null };

  render() {
    return (
      <div>
        <Header />

        <section style={{ display: 'grid', gridTemplateColumns: '2fr 3fr' }}>
          <div>
            <h3>Social</h3>
            <ul>
              <li>Compare research</li>
              <li>Vote on each trade </li>
              <li>Pool risk & save on fees</li>
            </ul>

            <h3>Non-Custodial</h3>
            <ul>
              <li>Keep control of your assets</li>
            </ul>

            <h3>Support for all De·Fi Assets</h3>
            <ul>
              <li>Uniswap Assets</li>
              <li>Loans (MakerDAO, Compound - Coming Soon)</li>
              <li>Prediction Markets (Augur - Coming Soon)</li>
              <li>Liquidity (UniSwap - Coming Soon)</li>
              <li>Collectables (ERC 721 - Coming Soon)</li>
            </ul>
          </div>

          <img
            src={LobbyImage}
            alt="Lobby screenshot"
            style={{ maxWidth: '600px' }}
          />
        </section>

        <section>
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
        </section>

        <section>
          <h2>How does it work?</h2>
          <ol>
            <li>Create a group and add members</li>
            <li>
              Each member can add funds to your group's custom portfolio
              contract
            </li>
            <li>Research and discuss trades in private lobby with chat</li>
            <li>Execute group trades through decentralized exchanges</li>
            <li>Each member's share is secured by the portfolio contract</li>
            <li>Cash out at any time</li>
          </ol>
        </section>
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
