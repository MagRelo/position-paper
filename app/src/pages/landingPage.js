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
          {/* Hero */}
          <div className="hero-grid">
            <div className="swap-order">
              <img className="hero-pic" src={Content} alt="doctors" />
            </div>

            <div className="title-container">
              <div>
                {/* <span className="highlight">
                  Welcome to Position&#8201;Paper!
                </span> */}
              </div>

              <div className="mb-2"></div>
              <h1>Accountable Publishing Platform</h1>
              <p>Social Trading Network</p>
            </div>
          </div>

          {/* Hero */}
          <section>
            <h2>How it works</h2>
            <ol>
              <li>
                Deposit any amount. Your balance is normalized to 1,000 units
              </li>
              <li>Long or Short ETH for any amount / duration / leverage.</li>
              <li>Add content to your trades / Add trades to your content.</li>
              <li>
                Build your network. Follow good traders and share useful
                positions. Compare your strategy against the network.
              </li>
              <li>Withdraw at any time.</li>
            </ol>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LandingPage;
