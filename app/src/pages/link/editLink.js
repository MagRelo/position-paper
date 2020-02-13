import React, { useState, useEffect, useContext } from 'react';
import { navigate } from '@reach/router';

import { AuthContext } from 'App';

import JobForm from 'pages/jobs/jobForm';

import { Loading } from 'components/random';

function LinkPage(props) {
  const { clearSession } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  const [link, setLink] = useState({});

  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;

    getLink(props.linkId, clearSession).then(body => {
      if (isSubscribed && body) {
        // admin only
        setLink(body.link);
        setIsLoading(false);
      }
    });

    // cleanup
    return () => {
      isSubscribed = false;
    };
  }, [props.linkId]);

  return (
    <div className="page-container">
      {isLoading ? (
        <div style={{ marginTop: '2em' }}>
          <Loading />
        </div>
      ) : (
        <JobForm formData={link.data} isEditing={true} linkId={link.linkId} />
      )}
    </div>
  );
}

export default LinkPage;

async function getLink(linkId, clearSession) {
  return await fetch('/api/link/' + linkId).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    // some type of error has occured...
    console.log(response.status, response.message);

    if (response.status === 404) {
      console.log('notfound');
      navigate('/notfound');
    }

    // clearSession if 401
    if (response.status === 401) {
      console.log('logging out...');
      clearSession();
    }

    return {};
  });
}
