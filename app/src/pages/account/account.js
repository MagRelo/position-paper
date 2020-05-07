import React, { useContext } from 'react';
import { Link } from '@reach/router';

import { AuthContext } from 'App';
import { UserProfile } from 'pages/account/userProfile';
import Feed from 'pages/position/feed';

function Dashboard(props) {
  const { user } = useContext(AuthContext);

  return (
    <section className="container">
      <div className="grid grid-5-3">
        <div className="swap-order">
          {/* User Profile */}
          <UserProfile user={user} showEdit={true} />
          <hr />

          {/* Balance */}
          <h2>Current Balance</h2>
          <div>ETH</div>
          <div>DAI</div>
          <div>USDC</div>

          <div className="mb-3"></div>

          {/* Results */}
          <h2>History</h2>

          <div>balance history</div>
          <div>balance history</div>
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
