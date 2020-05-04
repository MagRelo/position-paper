import React, { useState, useEffect, useContext } from 'react';

import { UserProfile } from 'components/userProfile';
import { AuthContext } from 'App';

function Dashboard(props) {
  const { user } = useContext(AuthContext);

  return (
    <section className="container">
      <h1>Dashboard</h1>
      <UserProfile user={user} />
    </section>
  );
}

export default Dashboard;
