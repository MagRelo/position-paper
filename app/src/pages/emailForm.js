import React, { useState } from 'react';
import { Loading } from 'components/random';

// import Bank from 'components/social/bank';

function UserBankAccount(props) {
  const [source, setSource] = useState(props.source || 'default');

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
      await addBankAccount(formObj);

      // update UI
      setSuccess(true);
      setLoading(false);
      setComplete(true);
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setComplete(true);
      setLoading(false);
    }
  }

  return (
    <div className="form-wrapper" style={{ textAlign: 'center' }}>
      <form name="emailForm" onSubmit={onSubmit}>
        {/* <fieldset className="form-group">
          <div className="grid grid-2">
            <div>
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
              />
            </div>

            <div>
              <button
                type="submit"
                className="pure-button pure-button-primary btn btn-theme btn-sm"
              >
                Get Started
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
              <div>
                {isSuccess ? (
                  <p>Success!</p>
                ) : (
                  <p
                    onClick={() => {
                      setComplete(false);
                    }}
                  >
                    Error
                  </p>
                )}
              </div>
            ) : null}
          </div>
        )}
      </form>
    </div>
  );
}

export default UserBankAccount;

async function addBankAccount(formObject) {
  return fetch('/api/user/account', {
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
