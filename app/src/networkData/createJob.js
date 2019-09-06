import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import InputRange from 'react-input-range';
import { useDebounce, lineItem, formatCurrency } from 'components/util/random';

function CreateJob(props) {
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
        max: Math.round(networkShare + networkShare * 0.7),
        value: networkShare
      });

      // target => 6.5%
      // set mix, max, default for target
      const targetShare = roundToNearest(salaryRange.min * 0.065, 250);
      setTargetBonus({
        min: Math.round(targetShare - targetShare * 0.3),
        max: Math.round(targetShare + targetShare * 0.7),
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

    addQuery(formObject).then(link => {
      // redirect
      navigate('/link/' + link.linkId);
    });
  }

  return (
    <section style={{ maxWidth: '48em', margin: '0 auto' }}>
      <h2>Post A New Job</h2>
      <form name="addJobForm" onSubmit={createQuery} className="pure-form">
        <legend>Job Information</legend>
        <fieldset>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
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
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            maxime sit quibusdam sunt vero ea! Sunt, quas nemo distinctio natus
            tempora atque harum, exercitationem excepturi sint culpa quis vitae
            aliquid!
          </p>

          <div className="row row-2">
            <div>
              <label htmlFor="text">Network Bonus</label>
              <div style={{ padding: '0 1em 0 0.5em' }}>
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
              <label htmlFor="text">Candidate Signing Bonus</label>
              <div style={{ padding: '0 1em 0 0.5em' }}>
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

        <legend>Review</legend>
        <fieldset>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et iusto
            praesentium omnis? Libero molestias provident maxime voluptates
            rerum, vel odio excepturi saepe nobis eos. Explicabo officiis
            tempora asperiores odit illo?
          </p>

          <div className="row row-3-5">
            <div />
            <div>
              {lineItem(
                'Candidate Bonus',
                formatCurrency(totalCost.targetBonus)
              )}
              {lineItem(
                'Network Bonus',
                formatCurrency(totalCost.networkBonus)
              )}
              {lineItem('Platform Fee', formatCurrency(totalCost.platformFee))}

              {lineItem('Total Cost', formatCurrency(totalCost.total))}
              {lineItem(
                'Recruiter Fee',
                formatCurrency(totalCost.recruiterFee)
              )}
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

// async function getAngelListData(url) {
//   return await fetch('/api/query/metadata', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ url: url })
//   }).then(response => {
//     if (response.status === 200) {
//       return response.json();
//     }

//     return { skills: [] };
//   });
// }

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
