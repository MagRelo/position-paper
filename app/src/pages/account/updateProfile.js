import React, { useContext, useState } from 'react';
import { AuthContext } from 'App';

import { UserProfile } from 'components/userProfile';

function UpdateProfile(props) {
  const { callApi, user, createSession } = useContext(AuthContext);

  const [displayName, setDisplayName] = useState(user.displayName);
  const [avatar, setAvatar] = useState(user.avatar);

  async function submit(event) {
    event.preventDefault();

    // get form data
    const formObject = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    console.log(formObject);

    // send to server
    await callApi('PUT', 'api/user', formObject)
      .then(async (user) => {
        createSession(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className="container">
      <div className="form-wrapper">
        <form name="updateProfile" onSubmit={submit}>
          <legend>Update Profile</legend>

          <hr />

          <div className="mb-4"></div>
          <UserProfile user={{ displayName, avatar }} hideDescription={true} />
          <div className="mb-4"></div>

          <hr />

          <div className="form-group">
            <label htmlFor="displayName" className="">
              Display Name
            </label>
            <input
              type="text"
              name="displayName"
              id="displayName"
              className="form-control"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="avatar" className="">
              Avatar
            </label>
            <input
              type="text"
              name="avatar"
              id="avatar"
              className="form-control"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>

          <hr />
          <button className="btn btn-theme">Save</button>
        </form>
      </div>
    </section>
  );
}

export default UpdateProfile;
