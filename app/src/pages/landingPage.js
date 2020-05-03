import React from 'react';
// import { Link } from '@reach/router';

import Scooter from 'images/undraw_on_the_way_ldaq.svg';

// import { GiHeartPlus } from 'react-icons/gi';
// import { FaHandHoldingHeart } from 'react-icons/fa';

function LandingPage() {
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container">
          <div className="mb-4"></div>

          <div className="hero-grid">
            <div className="swap-order">
              <img className="hero-pic" src={Scooter} alt="doctors" />
            </div>

            <div className="title-container">
              <div>
                <span className="title-theme-bg">
                  Welcome to Position&#8201;Paper!
                </span>
              </div>
              <h1>Prediction Tournament Platform</h1>

              <p>Social Prediction Market Media Platform</p>
            </div>
          </div>
        </div>

        <div className="container"></div>
      </div>
    </React.Fragment>
  );
}

export default LandingPage;
