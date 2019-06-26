import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class LandingPage extends Component {
  state = { accounts: null };

  render() {
    return (
      <div>
        <section>
          <h2>Incentive Engine</h2>
          <p>
            Post a request and a completion bonus and watch as a network of
            referrals form.
          </p>
        </section>

        <section>
          <div style={{ textAlign: 'center' }}>
            <h2>Referrals are the best hires.</h2>
            <h2>Everyone. Hates. Recruiters.</h2>
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
      </div>
    );
  }
}

export default LandingPage;
