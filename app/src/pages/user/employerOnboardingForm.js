import React, { useState, useEffect, useContext } from 'react';
import { navigate } from '@reach/router';

import {
  Elements,
  StripeProvider,
  injectStripe,
  CardElement
} from 'react-stripe-elements';

import { AuthContext } from 'App';

import { Loading } from 'components/random';

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Nunito, monospace',
        '::placeholder': {
          color: '#aab7c4'
        },
        ...(padding ? { padding } : {})
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };
};

function EmployerOnboardingForm(props) {
  // user
  const { clearSession } = useContext(AuthContext);

  // form
  const [formStatus, setFormStatus] = useState('new');
  // const [isEditing] = useState(props.isEditing || false);
  const [error, setError] = useState('');

  // form data
  const [email, setEmail] = useState('');

  // sync form with props
  useEffect(() => {
    if (props.formData) {
      // setJobTitle(props.formData.jobTitle);
      // setEmployer(props.formData.employer);
      // setLocation(props.formData.location);
      // setSalaryRange(props.formData.salaryRange);
      // On save, if "rawState.entityMap" was empty object then MongoDb will drops the property key(?)
      // This hack makes sure the "entityMap" property exists on the rawState object
      // const rawStateHack = props.formData.rawState;
      // rawStateHack.entityMap = rawStateHack.entityMap
      //   ? rawStateHack.entityMap
      //   : {};
      // setEditorState(createEditorState(props.formData.rawState));
    }
  }, [props.formData]);

  async function submit(event) {
    event.preventDefault();

    // loading
    setFormStatus('loading');

    // send to server

    // get and format form data
    var formObject = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // get stripe token
    let { token } = await props.stripe.createToken({ name: 'Name' });
    formObject.token = token;

    console.log('submitted:', formObject);

    addPaymentSource(formObject, clearSession)
      .then(link => {
        // redirect
        navigate('/profile');
      })
      .catch(error => {
        console.log(error);
        setError(error.toString());
        setFormStatus('error');
      });
  }

  return (
    <div className="container page-container">
      <div
        style={{
          maxWidth: '48em',
          margin: '0 auto'
        }}
      >
        <h1>Set Up Employer Account</h1>
        <p>
          Welcome to Talent Relay! Activate your employer account in order to
          post jobs:
        </p>
      </div>
      <div className="form-wrapper">
        <form
          name="employerOnboardingForm"
          className="employerOnboardingForm"
          onSubmit={submit}
        >
          <h3>Weekly Email Updates</h3>
          <p>
            You'll receive a weekly email containing a summary of each candidate
            and links to their profile.{' '}
          </p>
          <fieldset>
            <div className="input-group">
              <div className="input-group-prepend">
                <div
                  className="input-group-text"
                  style={{
                    border: 'none',
                    fontSize: 'smaller'
                  }}
                >
                  Email
                </div>
              </div>

              <label htmlFor="text" className="sr-only">
                Filter
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="enter email address"
                name="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </fieldset>

          <h3>Select Account Type</h3>

          <fieldset className="form-group">
            <div className="grid grid-2">
              <div>
                <div className="form-check">
                  <label>
                    <input
                      className="form-radio"
                      name="billing"
                      type="radio"
                      value="true"
                      id="stripeTerms"
                    />
                    Monthly – $99/mo
                  </label>
                </div>
              </div>
              <div>
                <div className="form-check">
                  <label>
                    <input
                      className="form-radio"
                      name="billing"
                      type="radio"
                      value="true"
                      id="stripeTerms"
                    />
                    Pay-per-Job – $29/job
                  </label>
                </div>
              </div>
            </div>
          </fieldset>

          <h3>Add Payment Source</h3>
          <fieldset>
            <div className="stripeWrapper">
              <CardElement {...createOptions('1em')} />
            </div>

            <div className="form-check">
              <label>
                <input
                  className="form-radio"
                  name="stripeTerms"
                  type="checkbox"
                  value="true"
                  id="stripeTerms"
                />
                Agree to Stripe Terms and Conditions
              </label>
            </div>
          </fieldset>

          <h3>Terms & Conditions</h3>
          <ul style={{ marginBottom: 0 }}>
            <li>
              Each Job must include a Talent Relay bonus. Bonus based on salary
            </li>
            <li>
              When a candidates Is hired the Talent Relay bonus must be paid
              within 7 days.
            </li>
            <li>
              If the employee leaves before 90 days then the bonus can be
              refunded.
            </li>
          </ul>

          <fieldset>
            <div className="form-check">
              <label>
                <input
                  className="form-radio"
                  name="terms"
                  type="checkbox"
                  value="true"
                  id="terms"
                />
                Agree to Talent Relay Terms and Conditions
              </label>
            </div>
          </fieldset>

          <hr />
          <div style={{ textAlign: 'right' }}>
            {formStatus === 'new' ? (
              <button className="btn btn-theme" type="submit">
                Activate Employer Account
              </button>
            ) : null}

            {formStatus === 'editing' ? (
              <button className="btn btn-theme" type="submit">
                Save
              </button>
            ) : null}

            {formStatus === 'loading' ? <Loading /> : null}

            {formStatus === 'error' ? (
              <p style={{ textAlign: 'center' }}>{error}</p>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

// wrap to get stripe methods
const InjectedCheckoutForm = injectStripe(EmployerOnboardingForm);
function StripeWrapper(props) {
  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}>
      <Elements>
        <InjectedCheckoutForm {...props} />
      </Elements>
    </StripeProvider>
  );
}

export default StripeWrapper;

async function addPaymentSource(formObject) {
  return fetch('/api/user/customer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObject)
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    throw Error(response.status);
  });
}
