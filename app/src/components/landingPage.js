import React, { Component } from 'react';

// icons
// import { IoIosGlobe } from 'react-icons/io';
// import { GiInfo } from 'react-icons/gi';
// import { GoGitMerge, GoBroadcast } from 'react-icons/go';
// import { MdInsertDriveFile } from 'react-icons/md';

class LandingPage extends Component {
  state = { accounts: null };

  render() {
    return (
      <React.Fragment>
        <section>
          <div className="row row-2">
            <div>
              <h2>Incentive Exchange</h2>
              <p>
                Build private, ad-hoc networks around standarized deals. Create
                transperant incentives to enable agents to independently achieve
                your goals.
              </p>
            </div>
            <div />
          </div>

          <div className="row row-3">
            <div>
              <h3>1) Design the Deal</h3>
              <ul>
                <li>Create a deal template</li>
                <li>
                  Add <b>Network Incentives</b>
                  <ul>
                    <li>Value (minus)</li>
                    <li>Price (plus)</li>
                  </ul>
                </li>
                <li>
                  Set <b>Incentive Pricing</b>
                  <ul>
                    <li>Algorithmic</li>
                    <li>Open</li>
                  </ul>
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
                <li>Interact using exsiting social apps</li>
                <li>
                  Integrate with popular enterprise products (coming soon)
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2>Examples</h2>

          <div
            className="row row-2"
            style={{ textAlign: 'center', padding: '1em' }}
          >
            <div>
              <h3>Recruiting</h3>
              <p>Post a candidate signing bonus and a network bonus.</p>
              <p>
                Watch as a network of referrals form to compete for the network
                bonus.
              </p>
              <p>Select the winner and pay each of the participants.</p>
            </div>

            <div>
              <h3>Commodity Sales</h3>
              <p>
                Post a product for sale and set a minimum sale price. Allow
                agents to inflate the price to cover their costs.
              </p>
              <p>Watch as a network of referrals form to sell your products.</p>
              <p>Complete the sale and pay each of the sales agents.</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Incentive Query Networks</h2>

          <h3>Total Cost</h3>
          <ol>
            <li>Search</li>
            <li>Transactional</li>
            <li>Direct</li>
            <li>Assessment</li>
            <li>Accountability & Recourse</li>
          </ol>
        </section>
      </React.Fragment>
    );
  }
}

export default LandingPage;
