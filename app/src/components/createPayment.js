import React from 'react';

function CreatePayment(props) {
  
  async function submit(event) {
    event.preventDefault();

    // get and format form data
    const formData = new FormData(event.target);
    var formObj = {};
    formData.forEach((value, key) => {
      formObj[key] = value;
    });


    // props.submit(formData);
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
          Make Payment
        </button>
      </form>
    </React.Fragment>
  );
}

export default CreatePayment;


async function createPaymnet(formData) {
  return await fetch('/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    throw new Error(response.status);
  });
}