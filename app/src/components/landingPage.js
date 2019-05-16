import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import LobbyImage from 'images/jessica-sysengrath-440137-unsplash.jpg';

import Header from './header';

class LandingPage extends Component {
  state = { accounts: null };

  render() {
    return (
      <div>
        <Header />

        <section style={{ display: 'grid', gridTemplateColumns: '2fr 3fr' }}>
          <div>
            <ul>
              <li>
                Spread the recruiting fee among the candidate and the people in
                their network that helped facilitate the connection
              </li>
              <li>
                The candidate gets most of the fee. The closer you are to the
                candidate the more you get.
              </li>
              <li>Everyone is incentized to be helpful and discreet</li>
            </ul>
          </div>

          <img
            src={LobbyImage}
            alt="Lobby screenshot"
            style={{ maxWidth: '600px' }}
          />
        </section>

        <section>
          <h2>How does it work?</h2>
          <div className="row row-3">
            <div>
              <h3>Create your profile</h3>
              <p>
                We'll help you create a beautiful portfolio. Share your link
                privately with friends and colleagues. They can also create
                their own links, and share them with employers.
              </p>
              <Link
                to="/newprofile"
                className="pure-button pure-button-primary"
              >
                Create Profile
              </Link>
              <Link
                to="/newposition"
                className="pure-button pure-button-primary"
              >
                Create Position
              </Link>
            </div>
            <div>
              <h3>You'll get contacted by prospective employers</h3>
              <p>
                Employers can contact you through our platform. Take your time
                interviewing.
              </p>
            </div>
            <div>
              <h3>Once you accept an offer, everyone gets paid!</h3>
              <p>
                Indicate which incoming message led to your offer, and the offer
                details. We'll determine the links that led back to you and
                split up the money with all of your connections that helped
                introduce you.
              </p>
            </div>
          </div>
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
