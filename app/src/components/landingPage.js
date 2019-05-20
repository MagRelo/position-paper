import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import LobbyImage from 'images/jessica-sysengrath-440137-unsplash.jpg';
// import AcImage from 'images/ac-revenue.png';
// import QuoImage from 'images/quo-revenue.png';

class LandingPage extends Component {
  state = { accounts: null };

  render() {
    return (
      <div>
        <section>
          <div className="row row-3">
            <div>
              <h2>Candidates</h2>
            </div>
            <div>
              <img
                style={{ maxWidth: '300px' }}
                src="https://cen.acs.org/content/cen/articles/95/i29/introverts-guide-networking/_jcr_content/articlebody/subpar/articlemedia_0.img.jpg/1499800449420.jpg"
                alt="network"
              />
            </div>
            <h2>Employers</h2>
          </div>
        </section>

        <section>
          <h2>How does it work?</h2>
          <div className="row row-3">
            <div>
              <h3>1. Create your profile</h3>
              <p>
                We'll help you create a beautiful portfolio. we'll create a
                special link for each person you share your profile with.
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
              <h3>
                2. Activate your network to quietly make contact on your behalf
              </h3>

              <p>
                Share your link privately with friends and colleagues. They can
                also create their own links, and share them with employers.
              </p>
              <p>
                Employers can contact you through our platform. Take your time
                interviewing.
              </p>
            </div>
            <div>
              <h3>
                3. When you accept an offer everyone shares in the referral
                bonus
              </h3>
              <p>
                Indicate which incoming message led to your offer, and the offer
                details. We'll determine the links that led back to you and
                split up the money with all of your connections that helped
                introduce you.
              </p>
            </div>
          </div>
        </section>
        {
          // <section>
          //   <h2>Old vs. New</h2>
          //   <div className="row row-2">
          //     <img
          //       src={QuoImage}
          //       alt="Lobby screenshot"
          //       style={{ maxWidth: '600px' }}
          //     />
          //     <img
          //       src={AcImage}
          //       alt="Lobby screenshot"
          //       style={{ maxWidth: '600px' }}
          //     />
          //   </div>
          // </section>
        }
        <section>
          <h2>Get Started</h2>

          <div className="row row-2">
            <div>
              <h3>Candidates</h3>
              <Link
                to="/newprofile"
                className="pure-button pure-button-primary"
              >
                Create Profile
              </Link>
            </div>
            <div>
              <h3>Employers</h3>
              <Link
                to="/newposition"
                className="pure-button pure-button-primary"
              >
                Create Position
              </Link>
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
