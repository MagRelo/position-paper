import React, { useContext, useState } from 'react';
import { AuthContext } from 'App';

function AddProp(props) {
  const { callApi } = useContext(AuthContext);

  const [positionType, setPositionType] = useState('');
  function handleOptionChange(event) {
    setPositionType(event.target.value);
  }

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
    await callApi('POST', 'api/props', formObject)
      .then(async (response) => {
        // success
        // navigate
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className="container">
      <div className="form-wrapper">
        <form name="loginForm" onSubmit={submit}>
          <legend>Add A Position</legend>

          <div className="form-group">
            <label htmlFor="position">Message</label>
            <textarea
              name="position"
              className="form-control"
              placeholder="Use this space to describe your reasoning..."
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="position">
              Position Type <small>How will this position be settled?</small>
            </label>
            <div className="grid grid-2">
              <div className="form-check">
                <label>
                  <input
                    className="form-radio"
                    type="radio"
                    id="position-type"
                    name="position-type"
                    value="option"
                    checked={positionType === 'option'}
                    onChange={handleOptionChange}
                  />
                  Option Trade
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    className="form-radio"
                    type="radio"
                    id="positionType"
                    name="positionType"
                    value="oracle"
                    checked={positionType === 'oracle'}
                    onChange={handleOptionChange}
                  />
                  Oracle
                </label>
              </div>
            </div>
          </div>

          {positionType === 'option' ? <OptionPanel /> : null}
          {positionType === 'oracle' ? <OraclePanel /> : null}

          <hr />
          <button className="btn btn-theme">Post</button>
        </form>
      </div>
    </section>
  );
}

function OptionPanel() {
  return (
    <div className="form-group">
      <label htmlFor="trade">Trade</label>
      <select name="trade" className="custom-select mb-3">
        <option value="long_eth_1x">Long ETH, 1x</option>
        <option value="long_eth_2x">Long ETH, 2x</option>
      </select>

      <label htmlFor="amount">Amount</label>
      <input type="number" name="amount" id="amount" className="form-control" />
    </div>
  );
}

function OraclePanel() {
  return (
    <div className="form-group">
      <label htmlFor="trade">Oracle</label>
      <select name="trade" className="custom-select mb-3">
        <option value="long_eth_1x">Guy 1</option>
        <option value="long_eth_2x">Other Guy</option>
      </select>

      <label htmlFor="amount">Amount</label>
      <input type="number" name="amount" id="amount" className="form-control" />
    </div>
  );
}

export default AddProp;
