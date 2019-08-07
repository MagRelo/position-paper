import React, { useState } from 'react';

function CreateTweet(props) {
  const [message, setMessage] = useState(props.message || '');

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

export default CreateTweet;
