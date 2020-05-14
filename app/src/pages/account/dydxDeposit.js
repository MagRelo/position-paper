import React, { useContext, useState } from 'react';

// import { getBalance } from 'api/magic';
import { Bouncing, EthereumAccount, DYdX } from 'components/random';
import { dxdyDeposit, dxdyWithdraw, dxdyWithdrawToZero } from 'api/dydx';
import { AuthContext } from 'App';

function DepositForm(props) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  async function deposit(event) {
    event.preventDefault();

    // get form data
    const formObject = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    console.log(formObject);

    setLoading(true);

    // send to server
    dxdyDeposit(formObject.amount)
      .then((response) => {
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
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

    setLoading(true);

    // send to server
    dxdyWithdraw(formObject.amount)
      .then((response) => {
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
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
        <h1>Manage dYdX Account</h1>

        <div className="grid grid-2">
          <EthereumAccount user={user} />
          <DYdX />

          <form name="depositDydx" onSubmit={deposit} className="panel">
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
            <button className="btn btn-theme">
              {loading ? <Bouncing /> : <span>Deposit</span>}
            </button>
          </form>

          <form name="withdrawDydx" onSubmit={withdraw} className="panel">
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
              {loading ? <Bouncing /> : <span>Withdraw All</span>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default DepositForm;
