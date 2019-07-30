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
                Build private, ad-hoc networks around transparent incentives to
                enable agents to independently achieve your goals.
              </p>
            </div>
            <div />
          </div>
        </section>

        <section>
          <h2>Incentive Network Examples</h2>

          <div className="row row-3">
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
              <p>Post a product for sale and set a minimum sale price.</p>
              <p>
                Allow agents to increase the price to cover their costs. Watch
                as a network of sales agents form to sell your products.
              </p>
              <p>When a sale is completed each agent involved is paid.</p>
            </div>

            <div>
              <h3>Curated Subscription Bundles</h3>
              <p>
                Content-creators can make access to their content available for
                subscription.
              </p>
              <p>
                Independant curators can collect content from various creators
                into curated bundles.
              </p>
              <p>All participants can participate in the revenue.</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Design Your Own Network</h2>
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
      </React.Fragment>
    );
  }
}

export default LandingPage;
