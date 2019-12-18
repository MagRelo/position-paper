import React from 'react';

import { LinkedIn } from 'react-linkedin-login-oauth2';

function LinkedInLogin(props) {
  async function handleSuccess(data) {
    const user = await sendAuthCode(data);
    props.createSession(user);
  }

  function handleError(error) {
    alert(error);
  }

  return (
    <div>
      <LinkedIn
        clientId="77b8hpip0vzxo9"
        onFailure={handleError}
        onSuccess={handleSuccess}
        scope="r_liteprofile r_emailaddress w_member_social"
        redirectUri="http://localhost:3000/linkedin/callback"
        className="login-button-linkedin"
      >
        <span
          className="icon"
          style={{
            background: '#0077B5',
            marginRight: '.667em'
          }}
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>LinkedIn icon</title>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </span>
        Login
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
