import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

// <section className="row row-2">
// <div style={{ textAlign: 'center' }}>
//   <h2>Recruiting</h2>
//   <p>
//     Referrals are the best hires. Everyone. Hates. Recruiters.
//     Recruiters can't help you find the perfect candidate. Who can?
//   </p>
//   <p>
//     <b>Your team.</b> And your team's network. You just need to{' '}
//     <b>motivate</b> them. It's easier than you think, and it's{' '}
//     <b>cheaper than recruiters</b>.
//   </p>
// </div>

// <div style={{ textAlign: 'center' }}>
//   <h2>Aselife</h2>
//   <p>Tender Platform</p>
//   <p>Connecting agricutlral producets buyers and sellers</p>
// </div>
// </section>

class LandingPage extends Component {
  state = { accounts: null };

  render() {
    return (
      <div>
        <section>
          <h2>Incentive Engine</h2>
          <p>Post a request and a completion bonus.</p>
          <p>Watch as a network of referrals form.</p>
          <p>Select the winner to distribute the completion bonus.</p>
        </section>
      </div>
    );
  }
}

export default LandingPage;
