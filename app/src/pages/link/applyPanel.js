import React, { useState, useContext } from 'react';
// import { Link } from '@reach/router';
import { Loading, formatCurrency, UserProfile } from 'components/random';
import LinkedInLogin from 'components/linkedinLogin';

import { AuthContext } from 'App';

// import { FaThumbsUp } from 'react-icons/fa';

import ResponseStatus from 'pages/response/responseStatus';
const domain = window.location.origin || 'http://localhost:3000';

function ApplyPanel({ link, user }) {
  console.log(user);
  const { activeSession } = useContext(AuthContext);

  const [hasApplied, setHasApplied] = useState(user.hasApplied || false);
  const [status, setStatus] = useState(user.applyStatus || '');
  const [applySteps, setApplySteps] = useState(user.applySteps || []);

  const [loading, setLoading] = useState(false);

  async function handleClick(event) {
    event.preventDefault();

    // submit
    try {
      setLoading(true);

      // send
      const { hasApplied, applySteps, applyStatus } = await createApplication(
        link.linkId,
        user._id
      );

      // update UI
      setHasApplied(hasApplied);
      setApplySteps(applySteps);
      setStatus(applyStatus);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div id="apply">
      {activeSession ? (
        <React.Fragment>
          {hasApplied ? (
            <div>
              <h3>Application Status</h3>
              <ResponseStatus status={status} steps={applySteps} />
            </div>
          ) : (
            <div>
              <h3>Apply Now</h3>
              <p className="p-tight">
                This position includes a{' '}
                <b>{formatCurrency(link.target_bonus)}</b> hiring bonus.
              </p>

              {loading ? (
                <Loading />
              ) : (
                <button
                  className="btn btn-theme btn-sm"
                  onClick={handleClick}
                  disabled={
                    user.hasApplied || user.isQueryOwner || user.isLinkOwner
                  }
                >
                  <span>Apply Now</span>
                </button>
              )}

              <hr />
              <a href={`${domain}/jobs/${user.jobBoardId}`}>
                <UserProfile user={user} hideDescription={true} />
              </a>
            </div>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h3>Apply Now</h3>
          <p className="p-tight">
            This position includes a <b>{formatCurrency(link.target_bonus)}</b>{' '}
            hiring bonus.
          </p>

          <LinkedInLogin redirect={'/link/' + link.linkId}>
            Apply Now
          </LinkedInLogin>

          <hr />
          <a
            href={`${domain}/jobs/${user.jobBoardId}`}
            className="user-profile-anchor"
          >
            <UserProfile user={user} hideDescription={true} />
          </a>
        </React.Fragment>
      )}
    </div>
  );
}

export default ApplyPanel;

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
