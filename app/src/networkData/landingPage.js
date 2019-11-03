import React from 'react';
// import { Link } from '@reach/router';
import CompareForm from 'networkData/displayForm';

function LandingPage() {
  return (
    <div className="landing">
      <section className="hero">
        <div className="row row-5-3">
          <div className="banner">
            <h1>Talent Relay</h1>
            <p>
              Assemble a <b> human-powered search engine</b> to find your
              perfect candidate. Simply <b>provide a reward</b> and watch a
              network of motivated, self-directed agents compete & cooperate to
              find what you need.
            </p>

            <p>
              Talent Relay is a new type of game where{' '}
              <b>the most profitable move is to participate</b>. It aligns the
              incentives of employers, candidates – and, most crucially – the{' '}
              <b> network of people that already connect them</b>.
            </p>
          </div>

          <div className="cta">
            <div className="cta-panel">
              <h3>Apply for Early Access</h3>
              <p>
                Talent Relay is launching soon – apply now to reserve your spot
                in line!
              </p>
              <a href="/signup" className="pure-button pure-button-primary">
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-header">How does it work?</h2>
        <div className="row row-3">
          <div className="landing-image-container">
            <h3>1. Post a Job and a Reward</h3>
            <p>
              Post your job and a reward for finding the perfect candidate.{' '}
              <b>Anyone can refer a candidate</b> and collect the reward. But a{' '}
              <b>smarter move is to share</b>...
            </p>
          </div>

          <div className="landing-image-container">
            <h3>2. Grow the Network </h3>

            <p>
              Other agents can create their own links from any existing link,
              forming a chain. If they find the candidate{' '}
              <b>the whole chain splits the reward</b>. This gives everyone the
              incentive to{' '}
              <b>share the job widely *and* to recruit new agents</b> to the
              search.
            </p>
          </div>

          <div className="landing-image-container">
            <h3>3. Reward the Winners</h3>
            <p>
              After you hire someone, select the winning candidate. We'll
              calculate the split and distribute the payments to each of the
              participants.
            </p>
          </div>
        </div>
      </section>

      <section>
        <CompareForm />
      </section>

      <section>
        <h2 className="section-header">Getting Started</h2>
        <div className="cta">
          <div
            className="cta-panel"
            style={{ maxWidth: '24em', margin: '0 auto' }}
          >
            <h3>Apply for Early Access</h3>
            <p>
              Talent Relay is launching soon – apply now to reserve your spot in
              line!
            </p>
            <a href="/signup" className="pure-button pure-button-primary">
              Apply Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
