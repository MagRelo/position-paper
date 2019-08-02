import React, { useState } from 'react';

import { Dialog } from '@reach/dialog';

import TwitterLogin from 'react-twitter-auth';

import UserLogin from 'components/loginForm';
import UserSignup from 'components/createUser';

function LoginButton(props) {
  // modal states
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  function closeAndCreateSession() {
    setLoginOpen(false);
    setSignupOpen(false);
    props.createSession();
  }

  function onSuccess(response) {
    response.json().then(user => {
      // console.log(user);
      if (user.token) {
        props.createSession(user);
      }
    });
  }

  function onFailed(error) {
    // debugger;
    alert(error);
  }

  return (
    <React.Fragment>
      {props.activeSession ? (
        <button
          className="pure-button pure-button-primary"
          onClick={props.clearSession}
        >
          Logout
        </button>
      ) : (
        <React.Fragment>
          {/* SIGNUP */}
          <button
            className="pure-button pure-button-primary"
            onClick={() => setSignupOpen(true)}
          >
            Signup
          </button>
          <Dialog isOpen={signupOpen} onDismiss={() => setSignupOpen(false)}>
            <UserSignup createSession={closeAndCreateSession} />
          </Dialog>

          {/* LOGIN */}
          <button
            className="pure-button pure-button-primary"
            onClick={() => setLoginOpen(true)}
          >
            Login
          </button>
          <Dialog isOpen={loginOpen} onDismiss={() => setLoginOpen(false)}>
            <UserLogin createSession={closeAndCreateSession} />
          </Dialog>

          {/* Twitter */}
          <TwitterLogin
            loginUrl="http://localhost:8080/api/auth/twitter"
            onFailure={onFailed}
            onSuccess={onSuccess}
            requestTokenUrl="http://localhost:8080/api/auth/twitter/reverse"
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default LoginButton;
