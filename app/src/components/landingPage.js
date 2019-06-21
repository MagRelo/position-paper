import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class LandingPage extends Component {
  state = { accounts: null };

  render() {
    return (
      <div>
        <section>
          <h1>
            Developers. <br /> Hate. <br /> Recruiters.
          </h1>
          <p>Recruiters can't help you build a strong team. Who can?</p>
          <p>
            <b>Your team.</b> And your team's network. You just need to{' '}
            <b>motivate</b> them.
          </p>

          <p>
            It's easier than you think, and <b>cheaper than recruiters</b>.
          </p>
        </section>

        <section>
          <h2>Incentive Engine</h2>
          <p>
            Build an incentive query network to super-charge your network's
            potential
          </p>
        </section>
      </div>
    );
  }
}

export default LandingPage;
