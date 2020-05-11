import React, { useContext, useState, useEffect } from 'react';

import { Bouncing } from 'components/random';
import { getBalance } from 'api/magic';
import {
  dydxGetBalance,
  dxdyDeposit,
  dxdyWithdraw,
  dxdyWithdrawToZero,
} from 'api/dydx';
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

  async function deposit(event) {
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

  async function withdraw(event) {
    event.preventDefault();

    // get form data
    const formObject = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    console.log(formObject);

    // send to server
    dxdyWithdraw(formObject.amount)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function withdrawToZero(event) {
    event.preventDefault();

    setLoading(true);

    // send to server
    dxdyWithdrawToZero()
      .then((response) => {
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <section className="container">
      <div className="form-wrapper">
        <h1>Manage dYdX</h1>

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

        <form name="depositTodydx" onSubmit={deposit} className="panel">
          <legend>Deposit</legend>

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

        <form name="depositTodydx" onSubmit={withdraw} className="panel">
          <legend>Withdraw</legend>

          <hr />

          <div className="form-group">
            <label htmlFor="amount" className="">
              Amount
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
          <button className="btn btn-theme">
            {loading ? <Bouncing /> : <span>Withdraw</span>}
          </button>

          <button
            className="btn btn-theme"
            onClick={withdrawToZero}
            type="button"
            disabled={loading}
          >
            {loading ? <Bouncing /> : <span>Withdraw To Zero</span>}
          </button>
        </form>
      </div>
    </section>
  );
}

export default DepositForm;
