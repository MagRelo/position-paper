import React, { useState } from 'react';
import { Dialog } from '@reach/dialog';

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
      >
        <span
          className="icon"
          style={{
            background: props.enabled ? gmailColor : '#cbcbcb'
          }}
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Gmail icon</title>
            <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.649 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068C.7 3.16 1.076 3 1.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z" />
          </svg>
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
