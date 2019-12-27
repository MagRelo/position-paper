import React, { useState } from 'react';
import { navigate } from '@reach/router';

function LinkButton(props) {
  const [isLoading, setIsLoading] = useState(false);
  function handleClick() {
    setIsLoading(true);
    createLink(props.parentLink).then(link => {
      setIsLoading(false);
      navigate('/link/' + link.linkId);
    });
  }

  return (
    <React.Fragment>
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
          <React.Fragment>{props.label}</React.Fragment>
        )}
      </button>
    </React.Fragment>
  );
}

export default LinkButton;

async function createLink(parentLink) {
  const apiEndpoint = '/api/link/add';

  return await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      parentLink: parentLink
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
