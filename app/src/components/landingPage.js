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
          <h2>Friction</h2>
          <div className="row row-3">
            <div>
              <h3>Pricipal/Agent Dilemma</h3>
              <ul>
                <li>Adverse Selection</li>
                <li>Moral Hazard</li>
              </ul>
            </div>

            <div>
              <h3>Transaction Costs</h3>
              <ol>
                <li>Search</li>
                <li>Transactional</li>
                <li>Direct</li>
                <li>Assessment</li>
                <li>Accountabiity & Recourse</li>
              </ol>
            </div>

            <div>
              <h3>Standardize Interactions: Protocol</h3>
              <h3>Establish a marketplace</h3>
            </div>
          </div>
        </section>
        <section>
          <h2>Incentive Exchange Platform</h2>
          <p>Seperate ownership and custody</p>
          <div className="row row-3">
            <div>
              <h3>1) Design a Protocol</h3>
              <ul>
                <li>Standardize terms</li>
                <li>Incentive structure: Value(minus) vs. Price(plus)</li>
                <li>Algorithmic pricing vs. free pricing</li>
              </ul>
            </div>
            <div>
              <h3>2) Create an Exchange</h3>
              <ul>
                <li>Membership: Public vs. Private</li>
                <li>Actions: Public vs. Private</li>
                <li>Powerful search features</li>
              </ul>
            </div>
            <div>
              <h3>3) Do Business</h3>
              <ul>
                <li>Instant, friction-free transactions</li>
                <li>Powerful insights & analytics tools</li>
                <li>
                  Use familiar social tools to interact + integrate with popular
                  products
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section>
          <h2>Examples</h2>

          <h3>Incentive Query Network</h3>
          <p>Post a request and a completion bonus.</p>
          <p>Watch as a network of referrals form.</p>
          <p>Select the winner to distribute the completion bonus.</p>
        </section>
      </div>
    );
  }
}

export default LandingPage;
