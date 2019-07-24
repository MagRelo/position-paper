import React, { useState } from 'react';
import { Dialog } from '@reach/dialog';
import { withRouter } from 'react-router-dom';

import ResponseForm from './createResponse';
import { formatCurrency } from 'components/util/random';

function ResponseButton(props) {
  const [responseOpen, setReponseOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  function handleClick(formData) {
    // setIsLoading(true);

    // add params
    formData.queryId = props.queryId;
    formData.linkId = props.linkId;

    sendResponse(formData).then(results => {
      setReponseOpen(false);

      props.history.push('/response/' + results._id);
    });
  }

  return (
    <React.Fragment>
      <button
        className="pure-button pure-button-primary"
        style={{ background: '#0fa51d' }}
        disabled={props.disabled}
        onClick={() => setReponseOpen(true)}
      >
        Respond: {formatCurrency(props.payoff)}
      </button>
      <Dialog isOpen={responseOpen} onDismiss={() => setReponseOpen(false)}>
        <ResponseForm submit={handleClick} />
      </Dialog>
    </React.Fragment>
  );
}

export default withRouter(ResponseButton);

async function sendResponse(formData) {
  // console.log(formData);

  const response = await fetch('/api/response/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  if (response.status === 200) {
    const responseObj = await response.json();
    console.log(responseObj);
    return responseObj;
  } else {
    console.log('not found', response.status);
  }
}
