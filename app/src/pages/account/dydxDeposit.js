import React, { useContext, useState, useEffect } from 'react';

import { getBalance } from 'api/magic';
import { dydxGetBalance, dxdyDeposit } from 'api/dydx';
import { AuthContext } from 'App';

function DepositForm(props) {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [network, setNetwork] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setLoading(true);
    Promise.all([dydxGetBalance(), getBalance(user.publicAddress)]).then(
      ([dydx, { network, balance }]) => {
        setNetwork(network.name);
        setBalance(balance);
        setLoading(false);
      }
    );
  }, [user]);

  async function submit(event) {
    event.preventDefault();

    // get form data
    const formObject = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    console.log(formObject);

    // send to server
    dxdyDeposit(formObject.amount)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className="container">
      <div className="form-wrapper">
        <form name="updateProfile" onSubmit={submit} className="panel">
          <legend>Deposit to dydx</legend>

          <hr />

          <div className="line-item">
            <div>Network</div>
            <div className="line-item-filler"></div>
            <div>{network}</div>
          </div>
          <div className="line-item">
            <div>Balance</div>
            <div className="line-item-filler"></div>
            <div>{balance}Ξ</div>
          </div>

          <hr />

          <div className="form-group">
            <label htmlFor="amount" className="">
              Deposit Amount
            </label>
            <input
              className="form-control"
              type="number"
              // max={balance}
              step={0.1}
              name="amount"
              id="amount"
            />
          </div>

          <hr />
          <button className="btn btn-theme">Deposit</button>
        </form>
      </div>
    </section>
  );
}

export default DepositForm;
