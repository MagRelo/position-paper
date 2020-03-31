import React, { useContext } from 'react';
import { AuthContext } from 'App';

// import { LinkedIn } from 'react-linkedin-login-oauth2';

import { GoogleLogin } from 'react-google-login';

function GoogleAuthLogin(props) {
  const { callApi, createSession } = useContext(AuthContext);

  async function handleSuccess(data) {
    // console.log(data);

    const method = 'POST';
    const endPoint = '/api/auth/google';
    callApi(method, endPoint, { user: data.profileObj, token: data.tokenObj })
      .then(user => {
        createSession(user, props.redirect);
      })
      .catch(error => {
        console.log(error);
        alert(error);
      });
  }

  function handleError(error) {
    console.log(error.details);
    alert(error.details);
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
