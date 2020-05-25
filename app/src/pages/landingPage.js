import React from 'react';
// import { Link } from '@reach/router';

import Content from 'images/undraw_sharing_articles_t5aa.svg';

// import { GiHeartPlus } from 'react-icons/gi';
// import { FaHandHoldingHeart } from 'react-icons/fa';

function LandingPage() {
  return (
    <React.Fragment>
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

            <h1>Bullshit-Free Media Platform</h1>

            <p>
              Time is precious & news is fake. Separate the signal from the
              noise. Every post includes a real, verifiable financial position.
            </p>
            <p>
              All positions are public, and every position is executed on the
              blockchain using actual value. Anyone can play. Everyone can keep
              score. Put up or shut up.
            </p>
          </div>
        </div>
      </div>

      <blockquote>
        A bet is a tax on bullshit...
        <cite>
          <a
            href="https://marginalrevolution.com/marginalrevolution/2012/11/a-bet-is-a-tax-on-bullshit.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Alex Tabarrok
          </a>
        </cite>
      </blockquote>

      {/* Top  */}
      <section>
        <div className="container">
          <div className="section-title">
            <h2>Top Predictors</h2>
          </div>

          <div className="grid grid-3">
            <div className="panel">guy</div>
            <div className="panel">girl</div>
            <div className="panel">anaon</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="container">
          <div className="section-title">
            <h2>How it Works</h2>
          </div>

          <div className="grid grid-2">
            <div className="swap-order">picture</div>
            <div>
              <div className="h3">Predict the Future</div>
              <p>We integrate with every service you could want: </p>
              <ul>
                <li>Synthetix: Oil, Gas, Gold, S&P500</li>
                <li>Auger: Politics, Weather</li>
                <li>Sports: Soccer, Football</li>
              </ul>
            </div>
          </div>

          {/* CMS */}
          <div className="grid grid-2">
            <div>picture</div>
            <div>
              <div className="h3">Create Compelling Content</div>
              <p>Powerful & Flexible Content System</p>
              <ul>
                <li>Format Posts</li>
                <li>Images and graphs</li>
                <li>Optimized for SEO & Social Networks</li>
              </ul>
            </div>
          </div>

          {/* Distribution */}
          <div className="grid grid-2">
            <div className="swap-order">picture</div>
            <div>
              <div className="h3">Build An Audience</div>
              <p>Attract an audience and build your brand</p>
              <ul>
                <li>Publish an Email Newsletter</li>
                <li></li>
                <li>Create subscription-only content</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Frontpage */}
      <section>
        <div className="container">
          <div className="section-title">
            <h2>Latest Positions</h2>

            <div className="grid grid-3">
              <div className="panel">a</div>
              <div className="panel">b</div>
              <div className="panel">c</div>
              <div className="panel">d</div>
              <div className="panel">e</div>
              <div className="panel">f</div>
              <div className="panel">g</div>
              <div className="panel">h</div>
              <div className="panel">i</div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default LandingPage;

// <ol>
// <li>
//   Deposit any amount. Your balance is normalized to 1,000 units
// </li>
// <li>Long or Short ETH for any amount / duration / leverage.</li>
// <li>Add content to your trades / Add trades to your content.</li>
// <li>
//   Build your network. Follow good traders and share useful
//   positions. Compare your strategy against the network.
// </li>
// <li>Withdraw at any time.</li>
// </ol>
