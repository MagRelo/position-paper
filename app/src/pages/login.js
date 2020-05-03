import React, { useContext } from 'react';
import { AuthContext } from 'App';

import { Magic } from 'magic-sdk';
const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY);

function Login(props) {
  const { createSession } = useContext(AuthContext);

  async function login(event) {
    event.preventDefault();

    // get form data
    const formObject = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    const didToken = await magic.auth.loginWithMagicLink({
      email: formObject.email,
    });

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
              <button className="btn btn-theme">Login</button>
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Login;
