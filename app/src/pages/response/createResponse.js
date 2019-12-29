import React, { useState } from 'react';
import { navigate } from '@reach/router';

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
    <div className="form-wrapper">
      <form name="createForm" className="form" onSubmit={submit}>
        <legend>Job</legend>
        <legend>Profile</legend>
        <legend>Respond</legend>
        <fieldset>
          <label htmlFor="name">Add a Message </label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            value={message}
            onChange={onChange}
            rows="3"
          />
        </fieldset>
        <hr />
        <button className="btn btn-sm btn-theme">Apply</button>
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
