import React, { useState, useEffect } from 'react';

import { useDebounce, lineItem, formatCurrency } from 'components/util/random';

function CreateJob(props) {
  // angelist data
  const [url, setUrl] = useState('');
  const debouncedUrl = useDebounce(url, 333);

  const [jobTitle, setJobTitle] = useState('');
  const [salary, setSalary] = useState('');
  const [employer, setEmployer] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState([]);
  const [jobData, setJobData] = useState([]);

  const [isSearching, setIsSearching] = useState(false);
  useEffect(
    () => {
      if (debouncedUrl) {
        setIsSearching(true);
        getAngelListData(url).then(result => {
          // console.log(result);
          // setJobData(result);

          setJobTitle(result.title);
          setSalary(
            formatCurrency(result.minSalary) +
              ' – ' +
              formatCurrency(result.maxSalary)
          );
          setEmployer(result.hiringOrganization);
          setLocation(result.location);
          setSkills(result.skills);

          setRecruiterBonus(result.minSalary * 0.2);
          setCandidateBonus(result.minSalary * 0.2 * 0.75);
          setNetworkBonus(result.minSalary * 0.2 * 0.25);

          setJobData(result.jobData);

          setIsSearching(false);
        });
      }
    },
    [debouncedUrl]
  );

  // Our State
  const [recruiterBonus, setRecruiterBonus] = useState(0);
  const [candidateBonus, setCandidateBonus] = useState(0);
  const [networkBonus, setNetworkBonus] = useState(0);

  function createQuery(event) {
    event.preventDefault();

    var formObject = { jobTitle, salary, employer, location, ...jobData };

    // get and format form data
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    addQuery({
      target_bonus: candidateBonus,
      network_bonus: networkBonus,
      title: jobTitle,
      type: 'Job',
      data: formObject
    }).then(link => {
      // redirect
      props.history.push('/link/' + link.linkId);
    });
  }

  return (
    <section>
      <h2>New Query</h2>
      <form name="addJobForm" onSubmit={createQuery} className="pure-form">
        <legend>Job Information</legend>

        <fieldset>
          <div className="row row-2 ">
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

            <div>
              <label htmlFor="salary">Salary</label>
              <input
                type="text"
                name="salary"
                className="pure-input-1"
                value={salary}
                onChange={e => {
                  setSalary(e.target.value);
                }}
              />
            </div>
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

          <label htmlFor="url">Skills</label>

          <ul style={{ padding: '0', minHeight: '22px', marginTop: '0.2em' }}>
            {skills.map(skill => (
              <li
                key={skill}
                style={{
                  display: 'inline',
                  marginRight: '1em',
                  padding: '0.15em 0.5em 0.3em',
                  border: 'solid 1px #ccc',
                  borderRadius: '4px',
                  fontSize: 'smaller'
                }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </fieldset>

        <fieldset>
          <div className="row row-5-3">
            <div>
              <label htmlFor="url">URL</label>
              <input
                type="text"
                name="url"
                className="pure-input-1"
                onChange={e => {
                  setUrl(e.target.value);
                }}
              />
            </div>

            <div style={{ marginTop: '40px' }}>
              {isSearching ? (
                <div className="spinner">
                  <div className="bounce1" />
                  <div className="bounce2" />
                  <div className="bounce3" />
                </div>
              ) : null}
            </div>
          </div>
        </fieldset>

        <div className="row row-2">
          <div>
            <legend>Network Settings</legend>
            <fieldset>
              {lineItem('Incentive Type', 'Value (minus)')}
              {lineItem('Incentive Pricing', 'Algorithmic')}
              {lineItem('Can follow Links', 'Yes')}
              {lineItem('Can follow Users', 'Yes')}
              {lineItem('Can create Child Links', 'Yes')}
            </fieldset>
          </div>
          <div>
            <legend>Add Network Incentives</legend>

            <fieldset>
              <i>
                {lineItem(
                  'Min Recruiter Fee (20%)',
                  formatCurrency(recruiterBonus)
                )}
              </i>
              <hr />
              <label htmlFor="candidate_bonus">Candidate Bonus</label>
              <input
                type="number"
                name="candidate_bonus"
                className="pure-input-1"
                style={{ textAlign: 'right' }}
                value={candidateBonus}
                onChange={e => {
                  setCandidateBonus(e.target.value);
                }}
              />

              <label htmlFor="network_bonus">Network Bonus</label>
              <input
                type="number"
                name="network_bonus"
                className="pure-input-1"
                style={{ textAlign: 'right' }}
                value={networkBonus}
                onChange={e => {
                  setNetworkBonus(e.target.value);
                }}
              />
            </fieldset>
            <fieldset>
              {lineItem(
                'Total',
                formatCurrency(
                  parseInt(candidateBonus, 10) + parseInt(networkBonus, 10)
                )
              )}
            </fieldset>
          </div>
        </div>

        <hr />
        <div style={{ textAlign: 'right' }}>
          <button className="pure-button pure-button-primary" type="submit">
            Create Query
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreateJob;

async function getAngelListData(url) {
  return await fetch('/api/query/metadata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url })
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    return { skills: [] };
  });
}

async function addQuery(queryData) {
  return fetch('/api/query/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(queryData)
  }).then(response => response.json());
}
