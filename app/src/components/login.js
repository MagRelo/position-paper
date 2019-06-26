import React, { useState } from 'react';

import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

import UserLogin from './loginForm';
import PlaidLink from 'components/loginPlaidLink';
import CreateUser from './createUser';

function LoginButton(props) {
  // modal states
  const [createOpen, setCreateOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // data
  const [token, setToken] = useState(false);
  const [account, setAccount] = useState(false);

  function getToken(token, account) {
    setToken(token);
    setAccount(account);
    // open form to get addtl user data
    setCreateOpen(true);
  }

  async function getForm(formJson) {
    // merge in token
    const userObj = Object.assign({}, formJson, { token, account });

    try {
      const user = await createUser(userObj);
      props.createSession(user);
      setCreateOpen(false);
    } catch (error) {
      console.log(error);
      // setCreateOpen(false);
    }
  }

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
          {/* SIGNUP */}
          <PlaidLink getToken={getToken} />

          {/* CREATE */}
          <Dialog isOpen={createOpen} onDismiss={() => setLoginOpen(false)}>
            <CreateUser getForm={getForm} />
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

// // get plaid token
// async function sendPublicToken(token) {
//   // prepare searchterm as safe url
//   const response = await fetch('/api/user/signup', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       token: token
//     })
//   });

//   if (response.status === 200) {
//     const user = await response.json();
//     return user;
//   } else {
//     console.log('signup error');
//     throw Error(response.status);
//   }
// }

async function createUser(formData) {
  return await fetch('/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  }).then(response => response.json());
}
