import React, { useState } from 'react';

function LinkButton(props) {
  const [isLoading, setIsLoading] = useState(false);
  function handleClick() {
    setIsLoading(true);
    createLink(props.queryId, props.parentLink).then(followStatus => {
      // setIsFollowing(followStatus);
      setIsLoading(false);
    });
  }

  return (
    <React.Fragment>
      <button
        className="pure-button pure-button-primary"
        onClick={handleClick}
        disabled={props.disable}
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

async function createLink(queryId, parentLink) {
  const apiEndpoint = '/api/link/add';

  return await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      queryId: queryId,
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
