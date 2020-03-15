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
          <h1>Community Organizations</h1>
          <p>Apply to be a community organization.</p>

          <h2>Preferred Organizations:</h2>
          <ul>
            <li>Public Schools</li>
            <li>Churches</li>
            <li>Libraries</li>
          </ul>
        </div>

        <CommunityForm />
      </div>
    </div>
  );
}

export default GetHelp;

function CommunityForm(props) {
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
            <label htmlFor="location">Name</label>
            <input
              type="text"
              name="name"
              required={true}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Phone Number</label>
            <input
              type="text"
              name="phone"
              required={true}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Email Address</label>
            <input
              type="email"
              name="email"
              required={true}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <GooglePlacesAutocomplete onSelect={onSelect} />
          </div>

          <div className="form-group">
            <label htmlFor="location">Radius (meters)</label>
            <input
              type="text"
              name="radius"
              required={true}
              className="form-control"
            />
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
