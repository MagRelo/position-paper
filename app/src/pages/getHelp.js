import React, { useState, useRef } from 'react';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { getLatLng } from 'react-google-places-autocomplete/dist/utils/googleGeocodesHelper';

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
          <h1>Get Help</h1>
          <p>
            This form can be used to request help for{' '}
            <a href="https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/high-risk-complications.html">
              persons at risk for serious illness from COVID-19
            </a>
            . According to the CDC, this includes:
          </p>
          <ul>
            <li>Older Adults</li>
            <li>
              People who have serious chronic medical conditions like:
              <ul>
                <li>Heart disease</li>
                <li>Diabetes</li>
                <li>Lung disease</li>
              </ul>
            </li>
          </ul>

          <h2>How does it work?</h2>
          <ol>
            <li>Fill out and submit the form below.</li>
            <li>
              When we find someone nearby we will send you an email and you can
              decide if you'd like to connect with them. We will never share
              *any* of your information publicly.
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

  const locationRef = useRef(null);
  const [placeId, setPlaceId] = useState('');
  const [address, setAddress] = useState('');
  const [latLng, setLatLng] = useState({});

  async function onSelect(data) {
    // console.log(data);

    //
    setPlaceId(data.place_id);
    setAddress(data.description);
    geocodeByPlaceId(data.place_id)
      .then(results => getLatLng(results[0]))
      .then(async latLng => setLatLng(latLng))
      .catch(error => {
        console.log(error);
        setError(error);
      });
  }

  function highlightLocation() {
    locationRef.current.setAttribute('class', 'flashit');
    setTimeout(() => {
      locationRef.current.setAttribute('class', '');
    }, 1000);
  }

  async function submit(event) {
    event.preventDefault();

    // force location
    if (!placeId || !latLng.lng) {
      console.log('no location');
      return highlightLocation();
    }

    // get form data
    const formObject = {
      placeId: placeId,
      address: address,
      location: {
        type: 'Point',
        coordinates: [latLng.lng, latLng.lat]
      }
    };
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // console.log(formObject);

    // loading
    setFormStatus('loading');

    submitForm(formObject)
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
          <legend>Request Help</legend>

          <div className="form-group">
            <label htmlFor="location">Name</label>
            <input
              type="name"
              name="displayName"
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

          <div className="form-group" ref={locationRef}>
            <label htmlFor="location">Location</label>
            <GooglePlacesAutocomplete
              onSelect={onSelect}
              inputClassName="form-control"
              suggestionsStyles={{
                container: {
                  zIndex: 100
                }
              }}
            />
          </div>
        </fieldset>

        <fieldset>
          <label htmlFor="location">
            What can we help with? (Check all that apply)
          </label>

          <div className="grid grid-2">
            <div className="form-check">
              <label>
                <input
                  className="form-radio"
                  type="checkbox"
                  id="help_grocery"
                  name="help_grocery"
                  value={true}
                />
                Grocery Delivery
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  className="form-radio"
                  type="checkbox"
                  id="help_wellness"
                  name="help_wellness"
                  value={true}
                />
                Wellness Checks
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  className="form-radio"
                  type="checkbox"
                  id="help_childcare"
                  name="help_childcare"
                  value={true}
                />
                Childcare
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  className="form-radio"
                  type="checkbox"
                  id="help_homeshool"
                  name="help_homeshool"
                  value={true}
                />
                Homeschooling Support
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  className="form-radio"
                  type="checkbox"
                  id="help_food"
                  name="help_food"
                  value={true}
                />
                Food Assistance
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  className="form-radio"
                  type="checkbox"
                  id="help_housing"
                  name="help_housing"
                  value={true}
                />
                Rent Support / Housing
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  className="form-radio"
                  type="checkbox"
                  id="help_transportation"
                  name="help_transportation"
                  value={true}
                />
                Transportation
              </label>
            </div>
          </div>
        </fieldset>

        <div className="mb-4"></div>

        <hr />

        <p style={{ fontSize: 'small' }}>
          <i>
            * Local Connect is a volunteer organization made up of individuals
            and agencies working for the public good. We do our best to ensure
            that everyone working with us to meet needs has only good
            intentions. That said, each person, whether helper or helpee is
            responsible to guard their personal information and make safe
            choices when interacting with community members.
          </i>
        </p>

        {/* Submit & Display */}
        <div style={{ textAlign: 'right' }}>
          {formStatus === 'new' ? (
            <button className="btn btn-theme" type="submit">
              Send Request
            </button>
          ) : null}

          {formStatus === 'loading' ? <Loading /> : null}

          {formStatus === 'success' ? (
            <div style={{ textAlign: 'center' }}>
              <h3>Success!</h3>
              <p>We'll send you an email with more instructions.</p>
            </div>
          ) : null}

          {formStatus === 'error' ? (
            <p style={{ textAlign: 'center' }}>{error}</p>
          ) : null}
        </div>
      </form>
    </div>
  );
}

async function submitForm(queryData) {
  const method = 'POST';
  const endPoint = '/api/gethelp';

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
