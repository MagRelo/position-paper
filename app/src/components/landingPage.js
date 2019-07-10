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
      <React.Fragment>
        <section>
          <h2>Incentive Exchange</h2>
          <p>
            Build ad-hoc social networks around standarized transactions. Enable
            independent agents to coordinate to achieve your goals.
          </p>
          <div className="row row-3">
            <div>
              <h3>1) Design a Deal</h3>
              <ul>
                <li>Standardize Terms & Structure</li>
                <li>
                  Add <b>Network Incentives</b>: Value(minus) vs. Price(plus)
                </li>
                <li>
                  Set <b>Incentive Pricing</b>: Algorithmic or Open
                </li>
              </ul>
            </div>
            <div>
              <h3>2) Design your Network</h3>
              <ul>
                <li>Membership: Open vs. Private</li>
                <li>Connections: Public vs. Private</li>
                <li>Actions: Public vs. Private</li>
              </ul>
            </div>
            <div>
              <h3>3) Do Business</h3>
              <ul>
                <li>Instant, friction-free transactions</li>
                <li>Powerful search, insights, and analytics tools</li>
                <li>Use familiar social tools to interact</li>
                <li>Integrate with popular enterprise products</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2>Transaction Costs</h2>
          <ol>
            <li>Search</li>
            <li>Transactional</li>
            <li>Direct</li>
            <li>Assessment</li>
            <li>Accountability & Recourse</li>
          </ol>
        </section>
        <section>
          <h2>Examples</h2>

          <h3>Talent</h3>
          <p>Post a request and a completion bonus.</p>
          <p>Watch as a network of referrals form.</p>
          <p>Select the winner to distribute the completion bonus.</p>
        </section>
      </React.Fragment>
    );
  }
}

export default LandingPage;
