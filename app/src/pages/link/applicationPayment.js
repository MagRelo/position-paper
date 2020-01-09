import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@reach/router';
import { formatCurrency } from 'components/random';

import { AuthContext } from 'App';

// network Data
// import { JobDisplay } from 'networkData/jobDisplay.js';
// import LinkAdmin from './linkAdmin';

import PaymentForm from 'pages/link/applicationPaymentForm';
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

function ApplicationPayment(props) {
  const { activeSession, clearSession } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  const [link, setLink] = useState({});
  const [user, setUser] = useState({});
  const [responseId, setResponseId] = useState('');

  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;

    getApplications(props.linkId, clearSession).then(response => {
      if (isSubscribed) {
        // display & admin
        setLink(response.link);
        setUser(response.user);
        setResponseId(response._id);

        setIsLoading(false);
      }
    });

    // cleanup
    return () => {
      isSubscribed = false;
    };
  }, [props.responseId]);

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
                  <div className="grid-label">Job Page</div>
                  <div>
                    <Link to={'/link/' + link.linkId}>View Job</Link>
                  </div>
                </React.Fragment>
              </div>

              <div className="grid grid-2">
                <div>
                  <h3>Application</h3>
                  <p>user: {user.firstname + ' ' + user.lastname}</p>
                </div>
                <div>
                  <h3>Payment</h3>
                  <PaymentForm
                    total={10000}
                    paymentSourceLabel={user.stripeCustomerLabel}
                    responseId={responseId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationPayment;

async function getApplications(responseId, clearSession) {
  return await fetch('/api/application/' + responseId).then(response => {
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
