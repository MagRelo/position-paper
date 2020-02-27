import React, { useState } from 'react';
import { Loading } from 'components/random';

function UserProfileForm({ user }) {
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [avatar, setAvatar] = useState(user.avatar || '');
  const [linkedInProfile, setLinkedInProfile] = useState(
    user.linkedInProfile || ''
  );
  const [jobBoardId, setJobBoardId] = useState(user.jobBoardId || '');
  const [description, setDescription] = useState(user.description || '');
  const [location, setLocation] = useState(user.location || '');
  const [email, setEmail] = useState(user.email || '');

  // status
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();

    // submit
    try {
      setLoading(true);

      // format form data
      const formData = new FormData(event.target);
      const formObj = {};
      formData.forEach((value, key) => {
        formObj[key] = value;
      });

      // send
      await upsertUserProfile(formObj);

      // update UI
      setSuccess(true);
      setComplete(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setComplete(true);
      setLoading(false);
    }
  }
  const domain = window.location.origin || 'http://localhost:3000';
  return (
    <div className="form-wrapper">
      <form name="userBankAccount" onSubmit={onSubmit}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="displayName">Display Name </label>
            <input
              className="form-control"
              type="text"
              id="displayName"
              name="displayName"
              value={displayName}
              onChange={e => {
                setDisplayName(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location </label>
            <input
              className="form-control"
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={e => {
                setLocation(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="avatar">Avatar </label>
            <input
              className="form-control"
              type="text"
              id="avatar"
              name="avatar"
              value={avatar}
              onChange={e => {
                setAvatar(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description </label>
            <textarea
              className="form-control"
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={e => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobBoardId">Job Board URL </label>
            <div style={{ margin: '1em 0 ' }}>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div
                    className="input-group-text"
                    style={{
                      fontSize: 'smaller',
                      border: 'none'
                    }}
                  >
                    {`${domain}/board/`}
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="jobBoardId"
                  name="jobBoardId"
                  placeholder="jobBoardId"
                  value={jobBoardId}
                  onChange={e => {
                    setJobBoardId(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email </label>
            <input
              className="form-control"
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="linkedInProfile">LinkedIn Profile URL </label>
            <input
              className="form-control"
              type="text"
              id="linkedInProfile"
              name="linkedInProfile"
              value={linkedInProfile}
              onChange={e => {
                setLinkedInProfile(e.target.value);
              }}
            />
          </div>
        </fieldset>
        <hr />
        {loading ? (
          <div style={{ margin: '0 auto' }}>
            <Loading />
          </div>
        ) : (
          <div>
            {complete ? (
              <div>
                {isSuccess ? (
                  <p>Success!</p>
                ) : (
                  <p
                    onClick={() => {
                      setComplete(false);
                    }}
                  >
                    Error
                  </p>
                )}
              </div>
            ) : (
              <button
                type="submit"
                className="pure-button pure-button-primary btn btn-theme btn-sm"
              >
                Submit
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default UserProfileForm;

async function upsertUserProfile(formObject) {
  return fetch('/api/user/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObject)
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    throw Error(response.status);
  });
}
