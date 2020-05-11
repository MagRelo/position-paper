import React from 'react';
import { Link } from '@reach/router';

import { UserProfile } from 'pages/account/userProfile';
import Feed from 'pages/position/feed';

import { Balance, copyTextToClipboard, formatNumber } from 'components/random';

function Dashboard({ isMe, user, stats }) {
  return (
    <section className="container">
      <div className="grid grid-3-5">
        <div>
          {/* User Profile */}
          <UserProfile displayUser={user} showEdit={true} />
          <hr />
          {isMe ? (
            <React.Fragment>
              <EthereumAccount user={user} />
              <hr />
              <DYdX />
              <hr />
            </React.Fragment>
          ) : null}
        </div>

        <div>
          <div className="grid grid-2">
            <div className="panel">
              <div>
                <b>Global Stats</b>
              </div>
              Average: {formatNumber(stats.global_avg)} (
              {formatNumber(stats.global_StdDev)})
            </div>
            <div className="panel">
              <div>
                <b>Network Stats</b>
              </div>
              Average: {formatNumber(stats.network_avg)} (
              {formatNumber(stats.network_StdDev)})
            </div>
          </div>
          <div className="mb-4"></div>
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
          <Feed items={[]} />
        </div>
      </div>
    </section>
  );
}

function EthereumAccount({ user }) {
  return (
    <div>
      <div>
        <Link
          className="btn btn-sm btn-unstyled"
          style={{ float: 'right' }}
          to="/deposit"
        >
          Deposit
        </Link>
        <b>Ethereum</b>
        <div className="mb-3"></div>
      </div>

      {/* Address */}
      <div className="line-item">
        <div>Address</div>
        <div className="line-item-filler"></div>
        <div>
          {user.publicAddress.substring(0, 10)}

          <button
            className="btn btn-sm btn-unstyled"
            style={{ marginLeft: '0.5rem' }}
            onClick={() => {
              copyTextToClipboard(user.publicAddress);
            }}
          >
            Copy
          </button>
        </div>
      </div>

      {/* Balance */}
      <div className="line-item">
        <div>Balance</div>
        <div className="line-item-filler"></div>
        <div>
          <Balance />
        </div>
      </div>
    </div>
  );
}

function DYdX({ user }) {
  return (
    <div>
      <div>
        <Link
          className="btn btn-sm btn-unstyled"
          style={{ float: 'right' }}
          to="/dydx"
        >
          Manage
        </Link>
        <b>dYdX</b>
        <p className="small">
          Deposits held on dydx{' '}
          <a
            href="https://docs.dydx.exchange/#/protocol?id=interest"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            earn or pay interest
          </a>
        </p>
        <div className="mb-3"></div>
      </div>

      <div className="line-item">
        <div>ETH</div>
        <div className="line-item-filler"></div>
        <div>0</div>
      </div>
      <div className="line-item">
        <div>USDC</div>
        <div className="line-item-filler"></div>
        <div>0</div>
      </div>
      <div className="line-item">
        <div>DAI</div>
        <div className="line-item-filler"></div>
        <div>0</div>
      </div>
    </div>
  );
}

export default Dashboard;
