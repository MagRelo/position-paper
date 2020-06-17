import React, { useContext } from 'react';

// import { getBalance } from 'api/magic';
// import { dydxGetBalance, dxdyDeposit } from 'api/dydx';
import { AuthContext } from 'App';

function DepositForm(props) {
  const { user } = useContext(AuthContext);

  // const [loading, setLoading] = useState(false);
  // const [network, setNetwork] = useState('');
  // const [balance, setBalance] = useState(0);

  // useEffect(() => {
  //   setLoading(true);
  //   Promise.all([getBalance(user.publicAddress)]).then(
  //     ([{ network, balance }]) => {
  //       setNetwork(network.name);
  //       setBalance(balance);
  //       setLoading(false);
  //     }
  //   );
  // }, [user]);

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1>Deposit ETH</h1>
        <p>Address: {user.publicAddress}</p>
        <div className="panel">SendWyre</div>
      </div>
    </div>
  );
}

export default DepositForm;
