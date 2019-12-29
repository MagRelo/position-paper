import React, { useState, useEffect, useContext } from 'react';
import { navigate } from '@reach/router';
import InputRange from 'react-input-range';
import { useDebounce, formatCurrency } from 'components/util/random';

// import LinkPayoutDisplayFixed from 'pages/link/linkDisplayBarFixed';

import { AuthContext } from 'App';

function CreateJob(props) {
  const { activeSession } = useContext(AuthContext);

  const [salaryRange, setSalaryRange] = useState({ min: 75000, max: 125000 });
  const debouncedRange = useDebounce(salaryRange, 333);
  const [networkBonus, setNetworkBonus] = useState(0);

  // Sync networkBonus with salary
  useEffect(() => {
    const salaryAverage = roundToNearest(
      (salaryRange.min + salaryRange.max) / 2,
      100
    );
    // network => 10% of salary
    setNetworkBonus(roundToNearest(salaryAverage * 0.1, 100));
  }, [debouncedRange]);

  function createQuery(event) {
    event.preventDefault();

    // get and format form data
    const formData = new FormData(event.target);
    var formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    if (!activeSession) {
      alert('Please login!');
    } else {
      addQuery(formObject).then(link => {
        // redirect
        navigate('/user');
      });
    }
  }

  return (
    <div className="form-wrapper">
      <form name="addJobForm" onSubmit={createQuery}>
        <fieldset>
          <legend>Job Information</legend>
          <div className="form-group">
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              required={true}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="employer">Employer</label>
            <input
              type="text"
              name="employer"
              required={true}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              required={true}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Description</label>
            <textarea
              type="text"
              name="description"
              required={true}
              className="form-control"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="text">Salary Range</label>
            <div style={{ padding: '0 1em 0 0.5em' }}>
              <InputRange
                name="salary"
                step={2500}
                maxValue={275000}
                minValue={25000}
                formatLabel={value => formatCurrency(value, true)}
                value={salaryRange}
                onChange={value => setSalaryRange(value)}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Network Incentives</legend>
          <div className="form-group">
            <label htmlFor="location">Network Bonus</label>
            <input
              type="text"
              name="network_bonus"
              disabled={true}
              className="form-control"
              value={formatCurrency(networkBonus)}
            />
          </div>
        </fieldset>

        <hr />
        <div style={{ textAlign: 'right' }}>
          <button className="btn btn-theme" type="submit">
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateJob;

async function addQuery(queryData) {
  return fetch('/api/query/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(queryData)
  }).then(response => response.json());
}

function roundToNearest(input, step) {
  return Math.round(input / step) * step;
}
