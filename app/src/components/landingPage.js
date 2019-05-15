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
                *You* get most of the recuiting fee – why should recruiters get
                $10,000's?!
              </li>
              <li>
                90% of jobs come from friends and colleagues because frinds and
                colleagues know you and can vouch for you.
              </li>
              <li>
                Completely private – you don't want to *advertise* that you're
                looking for a better job!
              </li>
              <li>Aligned incentives – everyone gets paid to help</li>
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
              <h3>Create your profile without worry – everything is private</h3>
              <p>
                We'll help you create a beautiful portfolio to showcase your
                talents. Share your link privately with friends and colleagues.
                They can also create their own links, and share them with
                employers.
              </p>
              <Link to="/invite" className="pure-button pure-button-primary">
                Create Profile
              </Link>
            </div>
            <div>
              <h3>You'll get contacted by prospective employers</h3>
              <p>
                Employers can contact you tehour our platform . Take your time
                interviewing. Using the URL that they use to find you, we can
                determine which connections led to the message.
              </p>
            </div>
            <div>
              <h3>Once you accept an offer, everyone gets paid!</h3>
              <p>
                Indicate which incoming message led to your offer, and the offer
                details. We'll determine the links that led back to you and
                split up the money.
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
