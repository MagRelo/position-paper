import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@reach/router';

import { AuthContext } from 'App';
import { UserProfile } from 'components/userProfile';
import Feed from 'pages/position/feed';

function Dashboard(props) {
  const { user } = useContext(AuthContext);

  return (
    <section className="container">
      <div className="grid grid-5-3">
        <div className="swap-order">
          <UserProfile user={user} />
        </div>

        <div>
          <h2>Open Positions</h2>
          <Link to="/addposition" className="btn btn-theme">
            Add Position
          </Link>

          <div className="mb-2"></div>
          <Feed userId={user._id} />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
