import React, { useState, useEffect, useContext } from 'react';

import { getBalance } from 'magic';

import { AuthContext } from 'App';

function Dashboard(props) {
  const { user } = useContext(AuthContext);

  return (
    <section className="container">
      <h1>Dashboard</h1>
      <p>Address: {user.publicAddress}</p>
      <p>
        Balance: <Balance publicAddress={user.publicAddress} />
      </p>
    </section>
  );
}

export default Dashboard;

function Balance({ publicAddress }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getBalance(publicAddress).then((balance) => {
      setBalance(balance);
    });
  }, [publicAddress]);

  return <span>{balance}</span>;
}
