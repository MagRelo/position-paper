import React, { useState, useContext } from 'react';
import { AuthContext } from 'App';

import { magicLogin } from 'api/magic';

import { Bouncing } from 'components/random';

function Login(props) {
  const { createSession } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  async function login(event) {
    event.preventDefault();

    setLoading(true);

    // get form data
    const formObject = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // do magic thing
    const didToken = await magicLogin(formObject.email);

    // send to server
    await fetch(`/auth/login`, {
      headers: new Headers({
        Authorization: 'Bearer ' + didToken,
      }),
      withCredentials: true,
      credentials: 'same-origin',
      method: 'POST',
    })
      .then(async (response) => {
        const user = await response.json();
        return createSession(user);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <React.Fragment>
      <section>
        <div className="container">
          <div className="form-wrapper">
            <form name="loginForm" onSubmit={login}>
              <legend>Login</legend>

              <p>We'll send you a link to login.</p>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required={true}
                  className="form-control"
                />
              </div>

              <hr />
              <button className="btn btn-theme">
                {loading ? (
                  <span>
                    <Bouncing />
                  </span>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Login;
