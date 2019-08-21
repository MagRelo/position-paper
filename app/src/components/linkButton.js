import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

function LinkButton(props) {
  const [isLoading, setIsLoading] = useState(false);
  function handleClick() {
    setIsLoading(true);
    createLink(props.parentLink).then(link => {
      setIsLoading(false);

      props.history.push('/link/' + link.linkId);

      // console.log(props);
    });
  }

  return (
    <React.Fragment>
      <button
        className="pure-button pure-button-primary"
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

export default withRouter(LinkButton);

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
