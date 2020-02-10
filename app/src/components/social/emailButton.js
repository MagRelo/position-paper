import React, { useState } from 'react';
import { Dialog } from '@reach/dialog';

import { FaEnvelope } from 'react-icons/fa';

const gmailColor = '#D14836';

function EmailButton(props) {
  const [socialFormOpen, setSocialFormOpen] = useState(false);

  function handleSubmit(formData) {
    //
    sendEmail(formData).then(results => {
      setSocialFormOpen(false);
    });
  }

  return (
    <div className="icon-block">
      <button
        className="button-unstyled"
        name="toAddress"
        onClick={() => setSocialFormOpen(true)}
        disabled={!props.enabled}
      >
        <span
          className="icon"
          style={{
            fontSize: '18px',
            background: props.enabled ? gmailColor : '#dfdfdf'
          }}
        >
          <FaEnvelope />
        </span>
      </button>

      {/*  */}
      <Dialog
        isOpen={socialFormOpen}
        onDismiss={() => setSocialFormOpen(false)}
      >
        <EmailForm submit={handleSubmit} link={props.link} />
      </Dialog>
    </div>
  );
}

export default EmailButton;

function EmailForm(props) {
  const [toAddress, setToAddress] = useState(props.toAddress || '');
  const [message, setMessage] = useState(props.message);

  function submit(event) {
    event.preventDefault();

    // format form data
    const formData = new FormData(event.target);
    var formObj = {};
    formData.forEach((value, key) => {
      formObj[key] = value;
    });

    // add linkId
    formObj.linkId = props.link.linkId;

    props.submit(formObj);
  }

  return (
    <React.Fragment>
      <form name="createForm" className="pure-form" onSubmit={submit}>
        <legend>Email</legend>

        <fieldset>
          <label htmlFor="toAddress">To </label>
          <input
            type="email"
            className="pure-input-1"
            name="toAddress"
            value={toAddress}
            onChange={event => {
              setToAddress(event.target.value);
            }}
          />
          <label htmlFor="message">Add a Message (optional) </label>
          <textarea
            className="pure-input-1"
            type="text"
            id="message"
            name="message"
            value={message}
            onChange={event => {
              setMessage(event.target.value);
            }}
            rows="5"
          />
        </fieldset>

        <button
          className="pure-button pure-button-primary"
          disabled={!toAddress}
        >
          Send
        </button>
      </form>
    </React.Fragment>
  );
}

async function sendEmail(formData) {
  const apiEndpoint = '/api/user/email';

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
