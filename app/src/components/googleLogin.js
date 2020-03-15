import React, { useContext } from 'react';
import { AuthContext } from 'App';

// import { LinkedIn } from 'react-linkedin-login-oauth2';

import { GoogleLogin } from 'react-google-login';

function GoogleAuthLogin(props) {
  const { createSession } = useContext(AuthContext);

  async function handleSuccess(data) {
    sendAuthCode(data.profileObj)
      .then(user => {
        // const redirect = props.redirect || ''
        // // execute promote, apply?
        // if(props.executePromote){
        //   const newLink = await createLink()
        // }

        createSession(user, props.redirect);
      })
      .catch(response => {
        console.log('error', response);
        alert(`An Error Occured: ${response.error}`);
      });
  }

  function handleError(response) {
    console.log('error', response);
    // alert(`An Error Occured: ${response.error}`);
  }

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Login"
      onSuccess={response => {
        handleSuccess(response);
      }}
      onFailure={response => {
        handleError(response);
      }}
      cookiePolicy={'single_host_origin'}
      render={renderProps => (
        <button className="btn btn-theme btn-sm" onClick={renderProps.onClick}>
          {props.children}
        </button>
      )}
    ></GoogleLogin>
  );
}

export default GoogleAuthLogin;

async function sendAuthCode(user) {
  const apiEndpoint = '/api/auth/google';

  return await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    // some type of error has occured...
    console.log(response.status, response.statusText);

    throw new Error(response.statusText);
  });
}

// async function createLink(parentLink) {
//   const apiEndpoint = '/api/link/add';

//   return await fetch(apiEndpoint, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       parentLink: parentLink
//     })
//   })
//     .then(r => {
//       return r.status === 200 ? r.json() : {};
//     })
//     .catch(error => {
//       console.error(error);
//       return {};
//     });
// }
// async function createApplication(linkId, userId) {
//   const apiEndpoint = '/api/response/add';

//   return await fetch(apiEndpoint, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       linkId,
//       userId
//     })
//   })
//     .then(r => {
//       return r.status === 200 ? r.json() : {};
//     })
//     .catch(error => {
//       console.error(error);
//       return {};
//     });
// }
