import React from 'react';
// import { Link } from '@reach/router';

import Content from 'images/undraw_sharing_articles_t5aa.svg';

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
              <img className="hero-pic" src={Content} alt="doctors" />
            </div>

            <div className="title-container">
              <div>
                <span className="title-theme-bg">
                  Welcome to Position&#8201;Paper!
                </span>
              </div>

              <div className="mb-2"></div>
              <h1>Transperant & Accountable Media Platform</h1>

              <p>Accountable Media Platform</p>
            </div>
          </div>
        </div>

        <div className="container"></div>
      </div>
    </React.Fragment>
  );
}

export default LandingPage;
