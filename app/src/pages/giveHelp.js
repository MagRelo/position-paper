import React, { useState, useRef, useContext } from 'react';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { getLatLng } from 'react-google-places-autocomplete/dist/utils/googleGeocodesHelper';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/assets/index.css';

import { AuthContext } from 'App';
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
          <h1>Give Help</h1>
          <p>
            This form can be used to offer help to{' '}
            <a href="https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/high-risk-complications.html">
              persons at risk for serious illness from COVID-19
            </a>
            .
          </p>

          <h2>What types of things will I do?</h2>
          <ul>
            <li>Small errands such as grocery shopping</li>
            <li>Taking pets for a walk</li>
            <li>Checking in to make sure everything is OK</li>
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
  const { callApi } = useContext(AuthContext);
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

    // loading
    setFormStatus('loading');

    const method = 'POST';
    const endPoint = '/api/givehelp';
    callApi(method, endPoint, formObject)
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

        <div className="mb-4"></div>

        <hr />

        <p style={{ fontSize: 'small' }}>
          <i>
            * Local Connect is a volunteer organization made up of individuals
            and agencies working for the public good. We do our best to ensure
            that everyone working with us to meet needs has only good
            intentions. That said, each person, whether helper or helpee is
            responsible to guard their personal information and make safe
            choices when interacting with community members. As helpers, you may
            drive your car, carry packages or use a personal communication
            account, just to name a few possible activities. Local Connect
            assumes no responsibility for how you carry out your volunteer
            duties or any damage you might do to yourself or others in so doing.
          </i>
        </p>

        {/* Submit & Display */}
        <div style={{ textAlign: 'right' }}>
          {formStatus === 'new' ? (
            <button className="btn btn-theme" type="submit">
              Send Offer
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
