import React, { useState } from 'react';
import { navigate } from '@reach/router';

function ApplyButton(props) {
  const [isLoading, setIsLoading] = useState(false);
  function handleClick() {
    setIsLoading(true);
    createApplication(props.linkId, props.userId).then(link => {
      setIsLoading(false);
      navigate('/link/' + props.linkId);
    });
  }

  return (
    <button
      className="btn btn-theme btn-sm"
      onClick={handleClick}
      disabled={props.disabled}
    >
      {isLoading ? (
        <div className="spinner">
          <div />
        </div>
      ) : (
        <span>{props.label}</span>
      )}
    </button>
  );
}

export default ApplyButton;

async function createApplication(linkId, userId) {
  const apiEndpoint = '/api/response/add';

  return await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      linkId,
      userId
    })
  })
    .then(r => {
      return r.status === 200 ? r.json() : {};
    })
    .catch(error => {
      console.error(error);
      return {};
    });
}
