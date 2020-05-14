import React from 'react';
import { Link } from '@reach/router';

import { UserProfile } from 'pages/account/userProfile';
import Feed from 'pages/position/feed';

import { EthereumAccount, DYdX, formatNumber } from 'components/random';

function Dashboard({ isMe, user, stats }) {
  return (
    <section className="container">
      <div className="grid grid-5-3">
        <div>
          <div>
            <Link
              to="/addposition"
              className="btn btn-sm btn-theme"
              style={{ float: 'right' }}
            >
              Add Position
            </Link>
            <h2>Open Positions</h2>
          </div>
          <div className="mb-4"></div>
          <Feed items={user.positions} hideUser={true} />
        </div>

        <div>
          {/* User Profile */}
          <UserProfile displayUser={user} showEdit={true} />
          <div className="mb-3"></div>
          <div className="panel">
            <div>
              <b>Global Stats</b>
            </div>
            Average: {formatNumber(stats.global_avg)} (
            {formatNumber(stats.global_StdDev)})
            <div>
              <b>Network Stats</b>
            </div>
            Average: {formatNumber(stats.network_avg)} (
            {formatNumber(stats.network_StdDev)})
          </div>
          <div className="mb-4"></div>
          {isMe ? (
            <React.Fragment>
              <EthereumAccount user={user} />
              <hr />
              <DYdX />
              <hr />
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
