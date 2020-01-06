import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@reach/router';
import { formatCurrency } from 'components/random';

import { AuthContext } from 'App';

// network Data
// import { JobDisplay } from 'networkData/jobDisplay.js';
// import LinkAdmin from './linkAdmin';

// import ResponseStatus from 'pages/response/responseStatus';
// import ApplyButton from './applyButton';

import { Loading } from 'components/random';

function jobDataItem(label, value) {
  return (
    <React.Fragment>
      <div className="grid-label">{label}</div>
      <div style={{ color: 'black' }}>{value}</div>
    </React.Fragment>
  );
}

function LinkPage(props) {
  const { activeSession, clearSession } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  const [link, setLink] = useState({});
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;

    getApplications(props.linkId, clearSession).then(body => {
      if (isSubscribed) {
        // display & admin
        setLink(body.link);
        setApplications(body.applications);

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
        <div>
          <div className="container">
            <div>
              <h2>{link.data.jobTitle}</h2>

              <div className="grid-left" style={{ margin: '1em 0' }}>
                {jobDataItem(
                  'Salary',
                  `${formatCurrency(
                    link.data.salaryMin,
                    true
                  )} – ${formatCurrency(link.data.salaryMax, true)}`
                )}

                <React.Fragment>
                  <div className="grid-label">Link</div>
                  <div>
                    <Link to={'/link/' + link.linkId}>View</Link>
                  </div>
                </React.Fragment>
              </div>

              <h2>Applications</h2>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Profile</th>
                    <th>Status</th>
                    <th>Select</th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map(application => {
                    return (
                      <tr key={application._id}>
                        <td>
                          {application.user.firstname +
                            ' ' +
                            application.user.lastname}
                        </td>
                        <td>
                          <a href="http://linkedin.com" target="_blank">
                            View
                          </a>
                        </td>
                        <td>{application.status}</td>
                        <td></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LinkPage;

async function getApplications(linkId, clearSession) {
  return await fetch('/api/applications/' + linkId).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    // some type of error has occured...
    console.log(response.status, response.message);

    // clearSession if 401
    if (response.status === 401) {
      console.log('logging out...');
      clearSession();
      return {};
    }
  });
}
