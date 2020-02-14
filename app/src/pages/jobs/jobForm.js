import React, { useState, useEffect, useContext } from 'react';
import { navigate } from '@reach/router';

import {
  Elements,
  StripeProvider,
  injectStripe,
  CardElement
} from 'react-stripe-elements';

import InputRange from 'react-input-range';
import { createEditorState, Editor } from 'medium-draft';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import 'medium-draft/lib/index.css';
import { convertToRaw } from 'draft-js';

import { AuthContext } from 'App';
import {
  useDebounce,
  formatCurrency,
  Loading,
  CardBrand
} from 'components/random';

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Nunito, sans-serif',
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

function roundToNearest(input, step) {
  return Math.round(input / step) * step;
}

function JobForm(props) {
  // user
  const { clearSession, user } = useContext(AuthContext);
  const [hasPaymentSource] = useState(!!user.stripeCustomerBrand);
  const [usePaymentSource, setUsePaymentSource] = useState(hasPaymentSource);
  // console.log('brand:', user.stripeCustomerBrand);

  // form
  const [formStatus, setFormStatus] = useState('new');
  const [isEditing] = useState(props.isEditing || false);
  const [error, setError] = useState('');
  const [linkId] = useState(props.linkId);
  const [email, setEmail] = useState('');

  // form data
  const [jobTitle, setJobTitle] = useState('');
  const [employer, setEmployer] = useState('');
  const [location, setLocation] = useState('');
  const [editorState, setEditorState] = useState(createEditorState());
  const refsEditor = React.createRef();
  const [status, setStatus] = useState('');

  const [salaryRange, setSalaryRange] = useState({ min: 75000, max: 125000 });
  const debouncedRange = useDebounce(salaryRange, 333);
  const [totalBonus, setTotalBonus] = useState(0);

  // sync form with props
  useEffect(() => {
    if (props.formData) {
      setJobTitle(props.formData.jobTitle);
      setEmployer(props.formData.employer);
      setLocation(props.formData.location);
      setSalaryRange(props.formData.salaryRange);

      // On save, if "rawState.entityMap" was empty object then MongoDb will drops the property key(?)
      // This hack makes sure the "entityMap" property exists on the rawState object
      const rawStateHack = props.formData.rawState;
      rawStateHack.entityMap = rawStateHack.entityMap
        ? rawStateHack.entityMap
        : {};
      setEditorState(createEditorState(props.formData.rawState));
      setStatus(props.formData.status);
    }
  }, [props.formData]);

  // Sync networkBonus with salary
  useEffect(() => {
    const salaryAverage = roundToNearest(
      (salaryRange.min + salaryRange.max) / 2,
      100
    );
    // network => 10% of salary
    setTotalBonus(roundToNearest(salaryAverage * 0.05, 100));
  }, [debouncedRange]);

  async function submit(event) {
    event.preventDefault();

    // get component data
    var formObject = {
      usePaymentSource: usePaymentSource,
      editorState: editorState,
      rawState: convertToRaw(editorState.getCurrentContent()),
      renderedHtml: mediumDraftExporter(editorState.getCurrentContent()),
      salaryRange: salaryRange
    };

    // get form data
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // payment & terms
    if (!isEditing) {
      // Terms checkbox
      if (!formObject.terms) {
        return alert('no terms');
      }

      // payment source & stripe token
      if (!usePaymentSource) {
        let { token } = await props.stripe.createToken({ name: 'Name' });
        if (!token || !formObject.stripeTerms) {
          return alert('no token');
        } else {
          formObject.token = token;
        }
      }
    }

    // loading
    setFormStatus('loading');

    submitJob(formObject, linkId, clearSession)
      .then(link => {
        // redirect
        navigate('/link/' + link.linkId);
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
          <legend>Job Information</legend>
          <div className="form-group">
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              required={true}
              className="form-control"
              value={jobTitle}
              onChange={e => {
                setJobTitle(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="employer">Employer</label>
            <input
              type="text"
              name="employer"
              required={true}
              className="form-control"
              value={employer}
              onChange={e => {
                setEmployer(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              required={true}
              className="form-control"
              value={location}
              onChange={e => {
                setLocation(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Job Description</label>
            <Editor
              ref={refsEditor}
              editorState={editorState}
              onChange={setEditorState}
              sideButtons={[]}
              placeholder="Add the job description here! (highlight text to format)"
            />
          </div>
        </fieldset>
        <div className="mb-4"></div>

        {/* External Referral Bonus */}
        <fieldset>
          {isEditing ? (
            <p>
              <i className="title-theme-bg">
                Note: Salary Range cannot be changed once the job has been
                posted
              </i>
            </p>
          ) : (
            <React.Fragment>
              <legend>External Referral Bonus</legend>
              <p>
                Every job on Talent Relay must include an external referral
                bonus. This amount must be paid within 7 days of hiring a
                candidate through Talent Relay. The amount of the bonus is based
                on the job's annual salary. Use the slider to set the salary
                range:
              </p>
            </React.Fragment>
          )}

          <div className="mb-4"></div>
          <div className="grid grid-2-x">
            <div className="form-group">
              <label htmlFor="text">Salary Range</label>
              <div style={{ padding: '0 20px' }}>
                <InputRange
                  name="salary"
                  step={5000}
                  maxValue={275000}
                  minValue={25000}
                  formatLabel={value => formatCurrency(value, true)}
                  value={salaryRange}
                  onChange={value => setSalaryRange(value)}
                  disabled={isEditing}
                />
              </div>
            </div>
            <div className="form-group ">
              <label htmlFor="network_bonus">Referral Bonus</label>
              <input
                className="form-control form-amount"
                type="text"
                name="network_bonus"
                disabled={true}
                value={formatCurrency(totalBonus)}
              />
            </div>
          </div>

          {isEditing ? null : (
            <div className="form-check">
              <label>
                <input
                  className="form-radio"
                  name="terms"
                  type="checkbox"
                  value="true"
                  id="terms"
                />
                Agree to Talent Relay{' '}
                <a href="/terms" target="_blank">
                  Terms and Conditions
                </a>
              </label>
            </div>
          )}
        </fieldset>
        <div className="mb-4"></div>

        {isEditing ? null : (
          <React.Fragment>
            {/* Payment */}
            <fieldset>
              <legend>Payment </legend>
              <div className="grid grid-2-x">
                <div>
                  <p>
                    The posting fee is a one-time payment. Your card will be
                    charged immediately.
                  </p>
                </div>

                <div>
                  <div className="form-group">
                    <label htmlFor="network_bonus">Posting Fee</label>
                    <input
                      className="form-control form-amount"
                      type="text"
                      name="network_bonus"
                      disabled={true}
                      value={formatCurrency(59)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="grid grid-x-2">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <label htmlFor="email">Payment Card</label>
                  </div>
                  <div>
                    {hasPaymentSource ? (
                      <div>
                        <div className="form-check">
                          <label>
                            <input
                              className="form-radio"
                              name="paymentSourceCheck"
                              id="usePaymentSource"
                              type="checkbox"
                              checked={usePaymentSource}
                              onChange={e => {
                                setUsePaymentSource(e.target.checked);
                                console.log(usePaymentSource);
                              }}
                            />
                            Use Saved Payment Source
                          </label>
                        </div>
                        <div className="mb-2"></div>
                      </div>
                    ) : null}
                  </div>
                </div>

                {usePaymentSource ? (
                  <div
                    className="stripeWrapper"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      gridGap: '0.75rem'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}
                    >
                      <CardBrand brand={user.stripeCustomerBrand} />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}
                    >
                      <span> {user.stripeCustomerLabel}</span>
                    </div>
                  </div>
                ) : (
                  <div className="stripeWrapper">
                    <CardElement {...createOptions('15px')} />
                  </div>
                )}
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
                  Agree to Stripe{' '}
                  <a href="/terms" target="_blank">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              <div className="mb-4"></div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required={true}
                  className="form-control"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </fieldset>
            <div className="mb-4"></div>
          </React.Fragment>
        )}

        {isEditing ? (
          <div className="form-group">
            <label htmlFor="status">Job Status</label>
            <select
              className="form-control"
              id="status"
              name="status"
              value={status}
              onChange={e => {
                setStatus(e.target.value);
              }}
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        ) : null}

        <hr />

        {/* Submit & Display */}
        <div style={{ textAlign: 'right' }}>
          {formStatus === 'new' ? (
            <button className="btn btn-theme" type="submit">
              {isEditing ? 'Save' : 'Post Job'}
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
const InjectedCheckoutForm = injectStripe(JobForm);
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

async function submitJob(queryData, linkId, clearSession) {
  // if we have a linkId then it's an update
  const method = linkId ? 'PUT' : 'POST';
  const endPoint = linkId ? '/api/query/update/' + linkId : '/api/query/add';

  // console.log(method, endPoint, queryData);

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
