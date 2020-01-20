import React, { useContext } from 'react';
import { AuthContext } from 'App';

import { LinkedIn } from 'react-linkedin-login-oauth2';

function LinkedInLogin(props) {
  const { createSession } = useContext(AuthContext);

  async function handleSuccess(data) {
    const user = await sendAuthCode(data);

    // execute promote, apply?

    createSession(user, props.redirect);
  }

  function handleError(error) {
    alert(error.message);
  }

  const domain = window.location.origin || 'http://localhost:3000';

  return (
    <div>
      <LinkedIn
        clientId="77b8hpip0vzxo9"
        onFailure={handleError}
        onSuccess={handleSuccess}
        scope="r_liteprofile r_emailaddress w_member_social"
        redirectUri={domain + '/linkedin/callback'}
        className="btn btn-theme btn-sm"
      >
        {props.children}
      </LinkedIn>
    </div>
  );
}

export default LinkedInLogin;

async function sendAuthCode(data) {
  const apiEndpoint = '/api/auth/linkedin/callback';

  return await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      access_code: data.code
    })
  })
    .then(r => {
      return r.status === 200 ? r.json() : {};
    })
    .catch(error => {
      console.error(error);
      return {};
    });
}

async function createLink(parentLink) {
  const apiEndpoint = '/api/link/add';

  return await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      parentLink: parentLink
    })
  })
    .then(r => {
      return r.status === 200 ? r.json() : {};
    })
    .catch(error => {
      console.error(error);
      return {};
    });
}
async function createApplication(linkId, userId) {
  const apiEndpoint = '/api/response/add';

  return await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      linkId,
      userId
    })
  })
    .then(r => {
      return r.status === 200 ? r.json() : {};
    })
    .catch(error => {
      console.error(error);
      return {};
    });
}
