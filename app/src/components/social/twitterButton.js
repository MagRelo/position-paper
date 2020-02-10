import React, { useState } from 'react';
import { Dialog } from '@reach/dialog';

const twitterColor = '#1DA1F2';

function SocialButton(props) {
  const [socialFormOpen, setSocialFormOpen] = useState(false);

  function handleClick(formData) {
    createTweet(formData).then(results => {
      setSocialFormOpen(false);
    });
  }

  return (
    <div className="icon-block">
      <button
        className="button-unstyled"
        name={props.company}
        onClick={() => setSocialFormOpen(true)}
        disabled={!props.enabled}
      >
        <span
          className="icon"
          style={{
            background: props.enabled ? twitterColor : '#dfdfdf'
          }}
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Twitter icon</title>
            <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
          </svg>
        </span>
      </button>

      {/* Form */}
      <Dialog
        isOpen={socialFormOpen}
        onDismiss={() => setSocialFormOpen(false)}
      >
        <CreateTweet submit={handleClick} link={props.link} />
      </Dialog>
    </div>
  );
}

export default SocialButton;

function CreateTweet(props) {
  const [message, setMessage] = useState(
    props.message ||
      `Check out my link on Talent Relay: https://talentrelay.app/link/${props.link.linkId}`
  );

  function handleChange(event) {
    setMessage(event.target.value);
  }

  function submit(event) {
    event.preventDefault();

    // format form data
    const formData = new FormData(event.target);
    var formObj = {};
    formData.forEach((value, key) => {
      formObj[key] = value;
    });

    formObj.linkId = props.link.linkId;

    props.submit(formObj);
  }

  return (
    <React.Fragment>
      <form name="createForm" className="pure-form" onSubmit={submit}>
        <legend>Tweet</legend>

        <fieldset>
          <label htmlFor="name">Message </label>
          <textarea
            className="pure-input-1"
            type="text"
            id="message"
            name="message"
            value={message}
            onChange={handleChange}
            rows="5"
          />
        </fieldset>

        <button className="pure-button pure-button-primary">Tweet</button>
      </form>
    </React.Fragment>
  );
}

async function createTweet(formData) {
  const apiEndpoint = '/api/user/tweet';

  return await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(r => {
      return r.status === 200 ? r.json() : {};
    })
    .catch(error => {
      console.error(error);
      return {};
    });
}
