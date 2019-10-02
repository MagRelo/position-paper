import React, { useState } from 'react';
import { navigate } from '@reach/router';

import EmailButton from 'components/social/emailButton';
import TwitterButton from 'components/social/twitterButton';
import LinkedinButton from 'components/social/linkedinButton';
import InstaButton from 'components/social/instagramButton';

function CreateResponse({ user, link }) {
  const [message, setMessage] = useState(
    'Thanks for your time. Looking forward to working with you soon!'
  );

  function submit(event) {
    event.preventDefault();

    // get and format form data
    const formData = new FormData(event.target);
    var formObj = {};
    formData.forEach((value, key) => {
      formObj[key] = value;
    });

    // add params
    formObj.linkId = link.linkId;

    sendResponse(formObj).then(results => {
      navigate('/response/' + results._id);
    });
  }

  function onChange(event) {
    setMessage(event.target.value);
  }

  return (
    <div>
      <h2 className="section-header">Send Response</h2>
      <form name="createForm" className="pure-form" onSubmit={submit}>
        <legend>Respond</legend>
        <fieldset>
          <label htmlFor="name">Message </label>
          <textarea
            className="pure-input-1"
            type="text"
            id="message"
            name="message"
            value={message}
            onChange={onChange}
          />
        </fieldset>

        <legend>Profile</legend>
        <div className="user-profile">
          <img src={user.avatar} alt="avatar" className="user-avatar" />
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-location">{user.location}</div>
          </div>
        </div>
        <legend>Social</legend>
        <fieldset>
          <div className="social-grid">
            <EmailButton enabled={true} link={link} />
            <TwitterButton enabled={true} link={link} />
            <LinkedinButton enabled={false} link={link} />
            <InstaButton enabled={false} link={link} />
          </div>
        </fieldset>

        <button className="pure-button pure-button-primary">
          Send Response
        </button>
      </form>
    </div>
  );
}

export default CreateResponse;

async function sendResponse(formObj) {
  // console.log(formData);

  const response = await fetch('/api/response/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObj)
  });

  if (response.status === 200) {
    const responseObj = await response.json();
    // console.log(responseObj);
    return responseObj;
  } else {
    console.log('not found', response.status);
  }
}
