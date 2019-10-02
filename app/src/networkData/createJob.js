import React, { useState, useEffect, useContext } from 'react';
import { navigate } from '@reach/router';
import InputRange from 'react-input-range';
import { useDebounce, lineItem, formatCurrency } from 'components/util/random';

import LinkPayoutDisplayFixed from 'pages/link/linkDisplayBarFixed';

import { AuthContext } from 'App';

function CreateJob(props) {
  const { activeSession } = useContext(AuthContext);

  const [jobTitle, setJobTitle] = useState('');
  const [employer, setEmployer] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState([]);

  const [salaryRange, setSalaryRange] = useState({ min: 75000, max: 125000 });
  const debouncedRange = useDebounce(salaryRange, 333);

  const [networkBonus, setNetworkBonus] = useState({
    min: 100,
    max: 5000,
    value: 3000
  });
  const [targetBonus, setTargetBonus] = useState({
    min: 100,
    max: 5000,
    value: 3000
  });

  // Sync target and network with salary
  useEffect(
    () => {
      // network => 3.5%
      // set mix, max, default for network
      const networkShare = roundToNearest(salaryRange.min * 0.035, 250);
      setNetworkBonus({
        min: Math.round(networkShare - networkShare * 0.3),
        max: Math.round(networkShare + networkShare * 1.7),
        value: networkShare
      });

      // target => 6.5%
      // set mix, max, default for target
      const targetShare = roundToNearest(salaryRange.min * 0.065, 250);
      setTargetBonus({
        min: Math.round(targetShare - targetShare * 0.3),
        max: Math.round(targetShare + targetShare * 1.7),
        value: targetShare
      });
    },
    [debouncedRange]
  );

  const [totalCost, setTotalCost] = useState({});
  // Sync total with target and network
  useEffect(
    () => {
      const subTotal = targetBonus.value + networkBonus.value;
      const platformFee = Math.round(subTotal * 0.1);
      setTotalCost({
        targetBonus: targetBonus.value,
        networkBonus: networkBonus.value,
        subTotal: subTotal,
        recruiterFee: roundToNearest(salaryRange.min * 0.2, 100),
        platformFee: platformFee,
        total: subTotal + platformFee
      });
    },
    [targetBonus, networkBonus]
  );

  function createQuery(event) {
    event.preventDefault();

    var formObject = { jobTitle, employer, location, description };

    // get and format form data
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    if (!activeSession) {
      alert('Please login!');
    } else {
      addQuery(formObject).then(link => {
        // redirect
        navigate('/link/' + link.linkId);
      });
    }
  }

  return (
    <section style={{ maxWidth: '48em', margin: '0 auto' }}>
      <form name="addJobForm" onSubmit={createQuery} className="pure-form">
        <legend>Job Information</legend>
        <fieldset>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              required={true}
              className="pure-input-1"
              value={jobTitle}
              onChange={e => {
                setJobTitle(e.target.value);
              }}
            />
          </div>

          <div className="row row-2 ">
            <div>
              <label htmlFor="employer">Employer</label>
              <input
                type="text"
                name="employer"
                required={true}
                className="pure-input-1"
                value={employer}
                onChange={e => {
                  setEmployer(e.target.value);
                }}
              />
            </div>

            <div>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                required={true}
                className="pure-input-1"
                value={location}
                onChange={e => {
                  setLocation(e.target.value);
                }}
              />
            </div>
          </div>

          <label htmlFor="location">Description</label>
          <textarea
            type="text"
            name="description"
            required={true}
            className="pure-input-1"
            rows="4"
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />

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
        </fieldset>

        <legend>Network Incentives</legend>

        <fieldset>
          <div className="row row-2">
            <div>
              <label htmlFor="text">Network Bonus</label>
              <div style={{ padding: '0 1em' }}>
                <InputRange
                  name="networkBonus"
                  step={250}
                  minValue={networkBonus.min}
                  maxValue={networkBonus.max}
                  formatLabel={value => `$${value}`}
                  value={networkBonus.value}
                  onChange={value =>
                    setNetworkBonus({ ...networkBonus, value: value })
                  }
                />
              </div>
            </div>
            <div>
              <label htmlFor="text">Employee Bonus</label>
              <div style={{ padding: '0 1em' }}>
                <InputRange
                  name="targetBonus"
                  step={250}
                  minValue={targetBonus.min}
                  maxValue={targetBonus.max}
                  formatLabel={value => `$${value}`}
                  value={targetBonus.value}
                  onChange={value =>
                    setTargetBonus({ ...targetBonus, value: value })
                  }
                />
              </div>
            </div>
          </div>
        </fieldset>

        <LinkPayoutDisplayFixed
          employer={employer}
          showLink={false}
          linkPayout={networkBonus.value}
          showChild={true}
          childPayout={networkBonus.value}
          candidatePayout={targetBonus.value}
        />

        <legend>Review & Compare</legend>
        <fieldset>
          <div className="row row-2">
            <div>
              <legend>Typical Hiring Process</legend>
              {lineItem(
                'Recruiter Fee',
                formatCurrency(totalCost.recruiterFee)
              )}
            </div>
            <div>
              <legend>Talent Realy</legend>
              {lineItem(
                'Friends & Family',
                formatCurrency(totalCost.networkBonus)
              )}
              {lineItem('New Employee', formatCurrency(totalCost.targetBonus))}
              {lineItem('Platform Fee', formatCurrency(totalCost.platformFee))}
              {lineItem('Total', formatCurrency(totalCost.total))}

              {lineItem(
                'Savings',
                formatCurrency(totalCost.recruiterFee - totalCost.total)
              )}
            </div>
          </div>
        </fieldset>

        <hr />
        <div style={{ textAlign: 'right' }}>
          <button className="pure-button pure-button-primary" type="submit">
            Post Job
          </button>
        </div>
      </form>
    </section>
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
