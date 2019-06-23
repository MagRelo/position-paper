import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class LandingPage extends Component {
  state = { accounts: null };

  render() {
    return (
      <div>
        <section>
          <div className="row row-2">
            <h2 style={{ textAlign: 'right' }}>
              Referrals are
              <br /> the best hires.
            </h2>
            <h2>
              Everyone. <br /> Hates. Recruiters.
            </h2>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p>
              Recruiters can't help you find the perfect candidate. Who can?
            </p>
            <p>
              <b>Your team.</b> And your team's network. You just need to{' '}
              <b>motivate</b> them.
            </p>

            <p>
              It's easier than you think, and it's{' '}
              <b>cheaper than recruiters</b>.
            </p>
          </div>
        </section>

        <section>
          <h2>Incentive Engine</h2>
          <p>Watch a network of referrals form </p>
        </section>
      </div>
    );
  }
}

export default LandingPage;
