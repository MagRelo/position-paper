import React, { useContext } from 'react';
import { Link } from '@reach/router';

import { AuthContext } from 'App';
import { UserProfile } from 'pages/account/userProfile';
import Feed from 'pages/position/feed';

function Dashboard(props) {
  const { user } = useContext(AuthContext);

  return (
    <section className="container">
      <div className="grid grid-3-5">
        <div>
          {/* User Profile */}
          <UserProfile displayUser={user} showEdit={true} />

          <div className="mb-3"></div>

          {/* Balance */}
          <div>ETH</div>
          <div>DAI</div>
          <div>USDC</div>

          <hr />

          {/* Results */}
          <p>Global Rank</p>
          <p>Rank In Your Network</p>
          <p>Network Connections</p>
        </div>

        <div>
          <Link
            to="/addposition"
            className="btn btn-sm btn-theme"
            style={{ float: 'right' }}
          >
            Add Position
          </Link>
          <h2>Open Positions</h2>
          <div className="mb-4"></div>
          <Feed userId={user._id} />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
