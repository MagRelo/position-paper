import React from 'react';

import post from 'images/1_doc.svg';
import network from 'images/2_network.svg';
import reward from 'images/3_reward.svg';

function LandingPage(props) {
  return (
    <React.Fragment>
      <section>
        <h2>How does it work?</h2>
        <div className="row row-3">
          <div className="landing-image-container">
            <h3>1. Post a Job</h3>
            <img src={post} alt="" className="landing-image" />
            <p>
              Post a job ad. Set bonuses to encourage your network to find and
              refer qualified candidates.
            </p>
          </div>

          <div className="landing-image-container">
            <h3>2. Grow the network</h3>
            <img src={network} alt="" className="landing-image" />
            <p>
              Watch as your employees and their friends form a network to find
              candidates for the position
            </p>
          </div>

          <div className="landing-image-container">
            <h3>3. Reward the winners</h3>
            <img src={reward} alt="" className="landing-image" />
            <p>
              After you hire a candidate select the winner and reward each
              participant in the chain
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2>Better (and cheaper!) than recruiters</h2>
        <table className="pure-table">
          <thead>
            <tr>
              <th> </th>
              <th>Incentive Network</th>
              <th>Recruiters</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>How mush does it cost? </td>
              <td>
                Free to post, then you choose the appropriate network incentives
                to power your search{' '}
              </td>
              <td> 20% of annual salary</td>
            </tr>
            <tr>
              <td>Where does the money go?</td>
              <td>
                To your employees, your friends, your investors, your favorite
                charities
              </td>
              <td>Anonymous corporation</td>
            </tr>
            <tr>
              <td>Who does the work?</td>
              <td>
                Independent agents cooperate and/or compete for the network
                incentives you offer
              </td>
              <td>✘</td>
            </tr>
            <tr>
              <td>Cheap</td>
              <td>✔</td>
              <td>✘</td>
            </tr>
          </tbody>
        </table>
      </section>
    </React.Fragment>
  );
}

export default LandingPage;

// <section>
// <h2>Incentive Networks: A new way to do business</h2>
// <div className="row row-3">
//   <div>
//     <h3>1) Design the Deal</h3>
//     <ul>
//       <li>Create a deal template</li>
//       <li>
//         Add <b>Network Incentives</b>
//         <ul>
//           <li>Value (minus)</li>
//           <li>Price (plus)</li>
//         </ul>
//       </li>
//       <li>
//         Set <b>Incentive Pricing</b>
//         <ul>
//           <li>Algorithmic</li>
//           <li>Open</li>
//         </ul>
//       </li>
//     </ul>
//   </div>
//   <div>
//     <h3>2) Design your Network</h3>
//     <ul>
//       <li>Membership: Open vs. Private</li>
//       <li>Connections: Public vs. Private</li>
//       <li>Actions: Public vs. Private</li>
//     </ul>
//   </div>
//   <div>
//     <h3>3) Do Business</h3>
//     <ul>
//       <li>Instant, friction-free transactions</li>
//       <li>Powerful search, insights, and analytics tools</li>
//       <li>Interact using existing social apps</li>
//       <li>Integrate with popular enterprise products (coming soon)</li>
//     </ul>
//   </div>
// </div>
// </section>
