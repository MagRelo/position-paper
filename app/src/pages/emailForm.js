import React, { useState } from 'react';
import { Loading } from 'components/random';

function EmailForm(props) {
  const [source] = useState(props.source || 'default');
  const [caption] = useState(props.caption || 'Sign up Now!');
  const [buttonCaption] = useState(props.buttonCaption || 'Submit!');

  // status
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();

    // submit
    try {
      setLoading(true);

      // format form data
      const formData = new FormData(event.target);
      const formObj = {};
      formData.forEach((value, key) => {
        formObj[key] = value;
      });

      // add intent for analytics
      formObj.source = source;

      // send
      const { success } = await signUpWithEmail(formObj);

      // update UI
      setSuccess(success);
      setLoading(false);
      setComplete(true);
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setComplete(true);
      setLoading(false);
    }
  }

  function ErrorPanel({ message, caption }) {
    const error = message || 'There has been an error! Please try again soon.';

    return (
      <div
        style={{
          borderColor: 'gray',
          display: 'grid',
          gridTemplateColumns: '1fr auto'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          {error}
        </div>

        <button
          className="btn btn-sm btn-theme"
          onClick={() => {
            setComplete(false);
          }}
        >
          Close
        </button>
      </div>
    );
  }

  function SuccessPanel({ message }) {
    const successMessage = message || "Success, you're in!";
    return <div style={{ textAlign: 'center' }}>{successMessage}</div>;
  }

  return (
    <div className="form-wrapper">
      <form name="emailForm" onSubmit={onSubmit}>
        <p style={{ textAlign: 'center' }}>{caption}</p>
        {/* <fieldset className="form-group">
          <div className="grid grid-2" >
            <div style={{ textAlign: 'center' }}>
              <div className="form-check">
                <label>
                  <input
                    className="form-radio"
                    type="checkbox"
                    value=""
                    id="employer"
                  />
                  I'm an Employer
                </label>
              </div>
            </div>
            <div>
              <div className="form-check">
                <label>
                  <input
                    className="form-radio"
                    type="checkbox"
                    value=""
                    id="candidates"
                  />
                  I'm a Candidate
                </label>
              </div>
            </div>
          </div>
        </fieldset> */}

        <fieldset>
          <div className="grid grid-2-x">
            <div>
              <label htmlFor="email" className="sr-only">
                Email{' '}
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                placeholder="Your Email Address"
                required
                disabled={loading || complete}
              />
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <button
                type="submit"
                className="pure-button pure-button-primary btn btn-theme btn-sm"
                disabled={loading || complete}
              >
                {buttonCaption}
              </button>
            </div>
          </div>
        </fieldset>

        {loading ? (
          <div style={{ margin: '0 auto' }}>
            <Loading />
          </div>
        ) : (
          <div>
            {complete ? (
              <div
                style={{
                  marginTop: '20px',
                  padding: '1em',
                  border: 'solid 1px',
                  borderColor: isSuccess ? '#03d665' : 'gray',
                  borderRadius: '7px'
                }}
              >
                {isSuccess ? <SuccessPanel /> : <ErrorPanel />}
              </div>
            ) : null}
          </div>
        )}
      </form>
    </div>
  );
}

export default EmailForm;

async function signUpWithEmail(formObject) {
  return fetch('/api/signup', {
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
