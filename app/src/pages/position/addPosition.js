import React, { useContext } from 'react';
import { AuthContext } from 'App';

function AddProp(props) {
  const { callApi } = useContext(AuthContext);

  async function submit(event) {
    event.preventDefault();

    // get form data
    const formObject = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // send to server
    await callApi('POST', 'api/props', formObject)
      .then(async (response) => {
        // success
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className="container">
      <div className="form-wrapper">
        <form name="loginForm" onSubmit={submit}>
          <legend>Add Position</legend>

          <div className="form-group">
            <label htmlFor="email">Title</label>
            <input
              type="title"
              name="title"
              required={true}
              className="form-control"
            />
          </div>

          <hr />
          <button className="btn btn-theme">Post</button>
        </form>
      </div>
    </section>
  );
}

export default AddProp;
