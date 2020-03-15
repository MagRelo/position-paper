import React, { useState } from 'react';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/assets/index.css';

import { Loading } from 'components/random';

function GetHelp() {
  return (
    <div className="page-container">
      <div className="container">
        <div
          style={{
            maxWidth: '52em',
            margin: '0 auto'
          }}
        >
          <h1>I Want To Help</h1>
          <p>
            This form can be used to offer help to{' '}
            <a href="https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/high-risk-complications.html">
              persons at risk for serious illness from COVID-19
            </a>
            .
          </p>

          <h2>What types of things?</h2>
          <ul>
            <li>Errands such as grocery shopping</li>
            <li>Taking pets for a walk</li>
            <li>other stuff</li>
          </ul>

          <h2>How does it work?</h2>
          <ol>
            <li>Fill out and submit the form below.</li>
            <li>
              When we find someone nearby we will send them an email with your
              information. They will contact you via email.
            </li>
          </ol>
        </div>

        <GetHelpForm />
      </div>
    </div>
  );
}

export default GetHelp;

function GetHelpForm(props) {
  // form
  const [formStatus, setFormStatus] = useState('new');
  const [error, setError] = useState('');

  const [placeId, setPlaceId] = useState('');

  function onSelect(data) {
    console.log('Place Id:', data.place_id);
    setPlaceId(data.place_id);
  }

  async function submit(event) {
    event.preventDefault();

    // get form data
    const formObject = {
      placeId: placeId
    };
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // loading
    setFormStatus('loading');

    submitJob(formObject)
      .then(link => {
        setFormStatus('success');
      })
      .catch(error => {
        console.log(error);
        setError(error.toString());
        setFormStatus('error');
      });
  }

  return (
    <div className="form-wrapper">
      <form name="addJobForm" onSubmit={submit}>
        {/* Description */}
        <fieldset>
          <legend>Offer To Help</legend>

          <div className="form-group">
            <label htmlFor="location">Your Name</label>
            <input
              type="text"
              name="name"
              required={true}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Your Email Address</label>
            <input
              type="email"
              name="email"
              required={true}
              className="form-control"
            />
          </div>

          <hr />

          <div className="form-group">
            <label htmlFor="location">
              Your Location (this will not be shared with anyone)
            </label>
            <GooglePlacesAutocomplete onSelect={onSelect} />
          </div>
        </fieldset>

        <div className="mb-4"></div>

        <hr />

        {/* Submit & Display */}
        <div style={{ textAlign: 'right' }}>
          {formStatus === 'new' ? (
            <button className="btn btn-theme" type="submit">
              Send Offer
            </button>
          ) : null}

          {formStatus === 'loading' ? <Loading /> : null}

          {formStatus === 'success' ? (
            <p style={{ textAlign: 'center' }}>Success</p>
          ) : null}

          {formStatus === 'error' ? (
            <p style={{ textAlign: 'center' }}>{error}</p>
          ) : null}
        </div>
      </form>
    </div>
  );
}

async function submitJob(queryData) {
  const method = 'POST';
  const endPoint = '/api/givehelp';

  return fetch(endPoint, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(queryData)
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    // some type of error has occured...
    console.log(response.status, response.statusText);
    throw new Error(response.statusText);
  });
}
