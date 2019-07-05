import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

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
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default LoginButton;
