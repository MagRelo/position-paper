import React, { useState, useEffect, useContext } from 'react';
import { navigate } from '@reach/router';

import {
  Elements,
  StripeProvider,
  injectStripe,
  CardElement
} from 'react-stripe-elements';

// import PaymentSourceForm from 'pages/user/userPaymentSource';
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
  const [isEditing] = useState(props.isEditing || false);
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
    try {
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

      // OnboardEmployer(formObject, clearSession).then(link => {
      //   // redirect
      //   navigate('/link/' + link.linkId);
      // });
    } catch (error) {
      console.log(error);
      setError(error.toString());
      setFormStatus('error');
    }
  }

  return (
    <div className="form-wrapper">
      <form
        name="employerOnboardingForm"
        className="employerOnboardingForm"
        onSubmit={submit}
      >
        <legend>Set Up Employer Acccount</legend>

        <p>Welcome to Talent Relay!</p>

        <p>
          <b>Talent Relay Bonus</b>
        </p>
        <ul>
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

        <p>
          <b>Weekly Email Updates</b>
        </p>
        <ul>
          <li>
            You'll receive a weekly email containing a summary of each candidate
            and links to their profile.{' '}
          </li>
        </ul>
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

        <p>
          <b>Add Payment Source</b>
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur,
          esse ad? Necessitatibus iste inventore repellat. Soluta, alias ducimus
          quos veritatis blanditiis voluptatum corporis dolorem, quis, obcaecati
          ad distinctio iure provident.
        </p>
        <fieldset className="form-group">
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

        <p>
          <b>Terms & Conditions</b>
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
          possimus non mollitia, impedit ratione qui ut laboriosam sapiente
          libero modi laudantium deleniti temporibus nostrum obcaecati
          voluptatibus eius omnis eaque!
        </p>

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
              Create Account
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
  );
}

// wrap to get stripe methods
const InjectedCheckoutForm = injectStripe(EmployerOnboardingForm);
function StripeWrapper(props) {
  return (
    <StripeProvider apiKey="pk_test_dMv1AAldL0wj69FLCG4c8jce00J8jWxWg9">
      <Elements>
        <InjectedCheckoutForm {...props} />
      </Elements>
    </StripeProvider>
  );
}

export default StripeWrapper;

async function OnboardEmployer(queryData, linkId, clearSession) {
  // if we have a linkId then it's an update
  const method = linkId ? 'PUT' : 'POST';
  const endPoint = linkId ? '/api/query/update/' + linkId : '/api/query/add';

  console.log(method, endPoint, queryData);

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

    // clearSession if 401
    if (response.status === 401) {
      console.log('logging out...');
      clearSession();
    }

    throw new Error(response.statusText);
  });
}
