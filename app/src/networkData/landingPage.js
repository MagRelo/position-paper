import React from 'react';
import { Link } from '@reach/router';
import post from 'images/1_doc.svg';
import network from 'images/2_network.svg';
import reward from 'images/3_reward.svg';

import CreateJob from 'networkData/displayForm';

function LandingPage() {
  return (
    <div className="landing">
      <section>
        <h1>Talent Relay</h1>

        <div className="row row-5-3">
          <div>
            <p>Find better candidates...</p>
            <p>Spend 75% less on recruiting...</p>
            <p>
              And give the money to your employees, friends, family, network...{' '}
            </p>
            <p>
              Redirect the money you would have spent on recruiters to your new
              employee, your existing employees, plus their friends, their
              family, friends of friends, etc. Use your recruiting process to
              build an extended network of goodwill.
            </p>
          </div>

          <div>
            <div style={{ textAlign: 'center' }}>
              <Link to="/search" className="pure-button pure-button-primary">
                Post a Job
              </Link>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link to="/search" className="pure-button pure-button-primary">
                Search for Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-header">How does it work?</h2>
        <div className="row row-3">
          <div className="landing-image-container">
            <h3>1. Post a Job</h3>
            <img src={post} alt="" className="landing-image" />
            <p>
              Post a job ad. Set bonuses to encourage your network to find and
              refer qualified candidates.
            </p>
          </div>

          <div className="landing-image-container">
            <h3>2. Grow the network</h3>
            <img src={network} alt="" className="landing-image" />
            <p>
              Watch as your employees and their friends form a network to find
              candidates for the position
            </p>
          </div>

          <div className="landing-image-container">
            <h3>3. Reward the winners</h3>
            <img src={reward} alt="" className="landing-image" />
            <p>
              After you hire a candidate select the winner and reward each
              participant in the chain
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-header">You Choose How Much To Pay</h2>
        <CreateJob />
      </section>
    </div>
  );
}

export default LandingPage;
