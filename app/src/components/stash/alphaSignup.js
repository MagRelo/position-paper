import React, { useState } from 'react';
// import { navigate } from '@reach/router';
// import InputRange from 'react-input-range';
import { useDebounce } from 'components/random';

function AlphaSignup() {
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("Thanks, we'll be in touch!");

  const [complete, setComplete] = useState(false);
  const debouncedComplete = useDebounce(complete, 1000);

  function submit(event) {
    event.preventDefault();
    setLoading(true);

    // convert FormData to object
    var formObject = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    submitForm(formObject).then(response => {
      console.log(response);

      setComplete(true);

      if (response.status !== 200) {
        // error
        setMessage(
          `There has been an error. Please try again.
          ("${response.statusText}")`
        );
      }
    });
  }

  return (
    <section style={{ maxWidth: '48em', margin: '0 auto' }}>
      <h1>Apply for Early Access</h1>
      <form
        name="alphaSignup"
        onSubmit={submit}
        className="pure-form alphaForm"
      >
        <legend>Company Information</legend>
        <fieldset>
          <div className="row row-2">
            <div>
              <label htmlFor="title">Company Name</label>
              <input
                type="text"
                name="company"
                required={true}
                className="pure-input-1"
              />
            </div>
            <div>
              <label htmlFor="title">Company Website</label>
              <input
                type="text"
                name="website"
                required={true}
                className="pure-input-1"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <label htmlFor="">Current Employees</label>
          <div className="row row-4">
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="employeeCount"
                  value="1-9"
                  className="form-radio"
                />
                1-9
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="employeeCount"
                  value="10-49"
                  className="form-radio"
                />
                10-49
              </label>
            </div>

            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="employeeCount"
                  value="50-200"
                  className="form-radio"
                />
                50-200
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="employeeCount"
                  value="200+"
                  className="form-radio"
                />
                200+
              </label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <label htmlFor="">How many positions are you hiring for?</label>
          <div className="row row-4">
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="openPositions"
                  value="1-9"
                  className="form-radio"
                />
                1-9
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="openPositions"
                  value="10-49"
                  className="form-radio"
                />
                10-49
              </label>
            </div>

            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="openPositions"
                  value="50-200"
                  className="form-radio"
                />
                50-200
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="openPositions"
                  value="200+"
                  className="form-radio"
                />
                200+
              </label>
            </div>
          </div>
        </fieldset>

        <legend>Your Contact Information</legend>
        <fieldset>
          <div className="row row-2">
            <div>
              <label htmlFor="title">Name</label>
              <input
                type="text"
                name="contactName"
                required={true}
                className="pure-input-1"
              />
            </div>
            <div>
              <label htmlFor="title">Email</label>
              <input
                type="email"
                name="contactEmail"
                required={true}
                className="pure-input-1"
              />
            </div>
          </div>
        </fieldset>

        <div style={{ textAlign: 'center', marginTop: '3em' }}>
          {debouncedComplete ? (
            <p>{message}</p>
          ) : (
            <button className="pure-button pure-button-primary" type="submit">
              {loading ? (
                <div className="spinner">
                  <div />
                </div>
              ) : (
                <span>Submit</span>
              )}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default AlphaSignup;

async function submitForm(formData) {
  return fetch('/api/alpha', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
}
