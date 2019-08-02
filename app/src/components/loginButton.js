import React from 'react';

import TwitterLogin from 'react-twitter-auth';

function LoginButton(props) {
  function onSuccess(response) {
    response.json().then(user => {
      props.createSession(user);
    });
  }

  function onFailed(error) {
    console.log(error);
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
        <TwitterLogin
          loginUrl="http://localhost:8080/api/auth/twitter"
          onFailure={onFailed}
          onSuccess={onSuccess}
          requestTokenUrl="http://localhost:8080/api/auth/twitter/reverse"
        />
      )}
    </React.Fragment>
  );
}

export default LoginButton;

// import { Dialog } from '@reach/dialog';
// import UserLogin from 'components/loginForm';
// import UserSignup from 'components/createUser';

//           {/* SIGNUP */}
//           <button
//             className="pure-button pure-button-primary"
//             onClick={() => setSignupOpen(true)}
//           >
//             Signup
//           </button>
//           <Dialog isOpen={signupOpen} onDismiss={() => setSignupOpen(false)}>
//             <UserSignup createSession={closeAndCreateSession} />
//           </Dialog>

//           {/* LOGIN */}
//           <button
//             className="pure-button pure-button-primary"
//             onClick={() => setLoginOpen(true)}
//           >
//             Login
//           </button>
//           <Dialog isOpen={loginOpen} onDismiss={() => setLoginOpen(false)}>
//             <UserLogin createSession={closeAndCreateSession} />
//           </Dialog>

//           // modal states
//   const [loginOpen, setLoginOpen] = useState(false);
//   const [signupOpen, setSignupOpen] = useState(false);

//   function closeAndCreateSession() {
//     setLoginOpen(false);
//     setSignupOpen(false);
//     props.createSession();
//   }
