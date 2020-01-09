import React, { useState } from 'react';
import { navigate } from '@reach/router';

import { Loading } from 'components/random';

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
      {isLoading ? (
        <Loading />
      ) : (
        <button
          className="btn btn-theme btn-sm"
          onClick={handleClick}
          disabled={props.disabled}
        >
          <span>{props.label}</span>
        </button>
      )}
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