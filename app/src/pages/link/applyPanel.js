import React, { useState, useContext } from 'react';
// import { Link } from '@reach/router';
import { Loading, formatCurrency } from 'components/random';
import LinkedInLogin from 'components/linkedinLogin';

import { AuthContext } from 'App';

import ResponseStatus from 'pages/response/responseStatus';

function ApplyPanel({ link, user }) {
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
              <p>
                Apply for this position. We'll pay you{' '}
                <b>{formatCurrency(link.target_bonus)}</b> if you're hired.
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
            </div>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h3>Apply Now</h3>
          <p>
            Apply for this position. We'll pay you{' '}
            <b>{formatCurrency(link.target_bonus)}</b> if you're hired.
          </p>

          <LinkedInLogin redirect={'/link/' + link.linkId}>
            Apply Now
          </LinkedInLogin>
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
