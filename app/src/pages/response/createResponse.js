import React, { useState } from 'react';
import { navigate } from '@reach/router';

function CreateResponse(props) {
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
    formObj.linkId = props.linkId;

    sendResponse(formObj).then(results => {
      navigate('/response/' + results._id);
    });
  }

  function onChange(event) {
    setMessage(event.target.value);
  }

  return (
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

      <button className="pure-button pure-button-primary">Send Response</button>
    </form>
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
