import React from 'react';
import TwitterLogin from 'react-twitter-auth';
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';

const domain = window.location.origin || 'http://localhost:3000';
const loginPath = '/api/auth/twitter';
const requestPath = '/api/auth/twitter/reverse';

function LoginButton(props) {
  // console.log(window.location.origin);

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
        <Menu>
          <MenuButton
            className="pure-button"
            style={{
              background: 'none',
              color: 'gray',
              padding: 'none',
              marginLeft: 0
            }}
          >
            <span aria-hidden>▾</span>
          </MenuButton>
          <MenuList>
            <MenuItem onSelect={() => props.clearSession()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <TwitterLogin
          loginUrl={domain + loginPath}
          requestTokenUrl={domain + requestPath}
          onFailure={onFailed}
          onSuccess={onSuccess}
          text="Login"
          className="pure-button login-button"
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
