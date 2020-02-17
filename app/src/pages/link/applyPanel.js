import React, { useState, useContext } from 'react';
// import { Link } from '@reach/router';

import { FaCheck } from 'react-icons/fa';
import { Loading, formatCurrency, UserProfile } from 'components/random';
import LinkedInLogin from 'components/linkedinLogin';
import { AuthContext } from 'App';

// import ResponseStatus from 'pages/response/responseStatus-2';

const domain = window.location.origin || 'http://localhost:3000';

function ApplyPanel({ link, user }) {
  // console.log(user);
  const { activeSession } = useContext(AuthContext);

  const [hasApplied, setHasApplied] = useState(user.hasApplied || false);

  // const [status, setStatus] = useState(user.applyStatus || '');
  // const [applySteps, setApplySteps] = useState(user.applySteps || []);

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
      // setApplySteps(applySteps);
      // setStatus(applyStatus);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div id="apply">
      <React.Fragment>
        {hasApplied ? (
          <div>
            <h3>
              Application Submitted{' '}
              <FaCheck style={{ verticalAlign: 'top', color: '#0ea51d' }} />
            </h3>
            <div className="mb-2"></div>
            <p>Your application has been sent to {link.data.employer}</p>
          </div>
        ) : (
          <div>
            <h3>Apply Now</h3>
            <p className="p-tight">
              This position includes a{' '}
              <b>{formatCurrency(link.target_bonus)}</b> hiring bonus.
            </p>

            {activeSession ? (
              <React.Fragment>
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
              </React.Fragment>
            ) : (
              <LinkedInLogin
                redirect={'/link/' + link.linkId}
                className="btn btn-theme btn-sm"
              >
                Apply Now
              </LinkedInLogin>
            )}
          </div>
        )}

        <div className="mb-4"></div>

        <hr style={{ marginTop: 0, marginBottom: 0 }} />
        <div className="promote-label">
          <span>Shared By</span>
        </div>
        <div className="mb-2"></div>

        <a href={`${domain}/board/${user.jobBoardId}`}>
          <UserProfile user={user} hideDescription={true} />
        </a>
      </React.Fragment>
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
