import React, { useContext } from 'react';
import { Link } from '@reach/router';

import { AuthContext } from 'App';
import { UserProfile } from 'pages/account/userProfile';
import Feed from 'pages/position/feed';

import { Balance } from 'components/random';

function Dashboard(props) {
  const { user } = useContext(AuthContext);

  return (
    <section className="container">
      <div className="grid grid-3-5">
        <div>
          {/* User Profile */}
          <UserProfile displayUser={user} showEdit={true} />
          <div className="mb-3"></div>

          <b>Ethereum</b>
          {/* Balance */}
          <div className="line-item">
            <div>ETH Account</div>
            <div className="line-item-filler"></div>
            <div>
              <Balance />
            </div>
          </div>

          <b>Exchange (dydx)</b>
          <div className="line-item">
            <div>Exchange Balance</div>
            <div className="line-item-filler"></div>
            <div>
              <Balance />
            </div>
          </div>

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
          <Feed items={[]} />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
