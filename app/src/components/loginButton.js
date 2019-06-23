import React, { useState } from 'react';

import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

import UserLogin from './loginForm';

import PlaidLink from './plaidLink';

function LoginButton(props) {
  const [loginOpen, setLoginOpen] = useState(false);

  function closeAndCreateSession() {
    setLoginOpen(false);
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
          <PlaidLink />

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
