import React from 'react';

function CreateResponse(props) {
  function submit(event) {
    event.preventDefault();

    // get and format form data
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
        <legend>Respond</legend>

        <fieldset>
          <label htmlFor="name">Message </label>
          <textarea
            className="pure-input-1"
            type="text"
            id="message"
            name="message"
          />
        </fieldset>

        <button className="pure-button pure-button-primary">
          Send Response
        </button>
      </form>
    </React.Fragment>
  );
}

export default CreateResponse;
