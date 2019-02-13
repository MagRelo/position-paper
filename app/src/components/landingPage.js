import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Loader from 'components/loader';
// import AutoForm from 'components/autoForm';

class LandingPage extends Component {
  state = { accounts: null };

  render() {
    return (
      <div>
        <h1>kurata</h1>

        <p>Stakeholders</p>

        <ul>
          <li>
            Teams: Reveal preferences by playing curation tournaments for fun
            and profit
          </li>
          <li>Auditors: Independently assess each team's past performance</li>
          <li>
            Sponsors: Get on-demand access to unique, high-quality experts
          </li>
        </ul>

        <h2>Teams</h2>
        <p>Form groups to monetize your collective intelligence.</p>
        <p>Monetize:</p>
        <ul>
          <li>
            Play tournaments at regular intervals and sell subscriptions to the
            feed of the results (email, json, rss)
          </li>
          <li>Play on-demand games funded by a sponsor</li>
        </ul>

        <h2>Auditors</h2>
        <p>Play a schelling game to encourage consensus</p>

        <h2>Sponsors</h2>
        <p>
          Get trustworthy, actionable insights from a variety of incentivised
          sources
        </p>

        <p>
          Obtaining high-quality information can be done in two ways: sourcing
          specific, knowlegable experts or combining the result of many games to
          obtain averages (or a combination of the two).
        </p>
        <ul>
          <li>
            <h3>Source Specific Experts</h3>
            <p>
              Find and vet specific groups. Subscribe for regular updates or
              submit custom requests.
            </p>
          </li>
          <li>
            <h3>Aggregated Results</h3>
            <p>
              Submit requests to a large number of groups simultaneously.
              Aggregate their results to produce more accurate data and use the
              overall results to create additinal incentives for groups to
              produce high-quailty information.
            </p>
          </li>
        </ul>

        <p>
          Create a <b>prompt</b> and a <b>set of options</b> that will be
          submitted to the players. Curator produces either a{' '}
          <b>weighted basket</b> or an <b>ordered list</b>.
        </p>

        <div className="row row-2">
          <div>
            <h3>Example: Weighted Basket</h3>
            <pre>
              <p>Prompt: Build a portfolio of these assets</p>
              <ul>
                <li>BTC</li>
                <li>ETH</li>
                <li>XMR</li>
                <li>LTC</li>
              </ul>
              <br />
              <p>Result:</p>
              <br />
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Allocation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>BTC</td>
                    <td>91%</td>
                  </tr>
                  <tr>
                    <td>ETH</td>
                    <td>7%</td>
                  </tr>
                  <tr>
                    <td>LTC</td>
                    <td>2%</td>
                  </tr>
                  <tr>
                    <td>XMR</td>
                    <td>0%</td>
                  </tr>
                </tbody>
              </table>
            </pre>
          </div>
          <div>
            <h3>Example: Ordered List</h3>
            <pre>
              <p>Prompt: In what order will these happen?</p>
              <ul>
                <li>ETH deploys Contantinople</li>
                <li>BCH collapse</li>
                <li>ZCash ZK-Snark deployed</li>
                <li>June 1st 2019</li>
              </ul>
              <br />
              <p>Result:</p>
              <br />
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Item</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>ETH deploys Contantinople</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>ZCash ZK-Snark deployed</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>June 1st 2019</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>BCH collapse</td>
                  </tr>
                </tbody>
              </table>
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
