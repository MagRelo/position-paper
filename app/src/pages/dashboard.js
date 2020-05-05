import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@reach/router';

import { AuthContext } from 'App';
import { UserProfile } from 'components/userProfile';
import Feed from 'pages/position/feed';

function Dashboard(props) {
  const { user } = useContext(AuthContext);

  return (
    <section className="container">
      <h1>Dashboard</h1>
      <UserProfile user={user} />

      <div className="mb-4"></div>
      <h2>Positions</h2>
      <Link to="/addposition" className="btn btn-theme">
        Add Position
      </Link>

      <div className="mb-2"></div>
      <Feed userId={user._id} />
    </section>
  );
}

export default Dashboard;
