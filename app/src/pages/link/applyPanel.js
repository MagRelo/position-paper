import React, { useState, useContext } from 'react';
import { Link } from '@reach/router';
import { Loading, formatCurrency, formatDate } from 'components/random';

import { AuthContext } from 'App';

import ResponseStatus from 'pages/response/responseStatus';

function ApplyPanel({ link, user }) {
  const { activeSession } = useContext(AuthContext);

  const [hasApplied, setHasApplied] = useState(user.hasApplied || false);
  const [applyDate, setApplyDate] = useState(user.applyDate || '');
  const [status, setStatus] = useState(user.applyStatus || '');

  const [loading, setLoading] = useState(false);

  async function handleClick(event) {
    event.preventDefault();

    // submit
    try {
      setLoading(true);

      // send
      const { hasApplied, status, applyDate } = await createApplication(
        link.linkId,
        user._id
      );

      // update UI
      setHasApplied(hasApplied);
      setApplyDate(applyDate);
      setStatus(status);

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
              <h3 className="section-header">Application Status</h3>
              <p>You applied to this job on {formatDate(applyDate)}</p>
              <ResponseStatus status={status} />
            </div>
          ) : (
            <div>
              <h2>Apply for this Job</h2>
              <p>
                Apply for this position. We'll pay you{' '}
                {formatCurrency(link.target_bonus)} if you're hired.
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
          <h2>Apply for this Job</h2>
          <p>
            Apply for this position. We'll pay you{' '}
            {formatCurrency(link.target_bonus)} if you're hired.
          </p>
          <Link
            className="btn btn-sm btn-theme"
            label={'Apply Now'}
            to={'/login?link=' + link.linkId}
          >
            Apply Now
          </Link>
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
