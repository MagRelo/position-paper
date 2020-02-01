import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@reach/router';

// import { Tabs, TabList, TabPanels, TabPanel } from '@reach/tabs';
import {
  formatCurrency,
  Loading,
  JobBoard,
  ProfilePic
} from 'components/random';

// import PaymentsTable from './userPaymentsTable';
import ResponseList from './userResponseTable';
import JobTable from './userJobsTable';
import LinksTable from './userLinksTable';
import StreamList from './userStream';

import { AuthContext } from 'App';

function User(props) {
  const { clearSession, user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(user);
  const [links, setLinks] = useState([]);
  const [jobs, setJobs] = useState([]);
  // const [payments, setPayments] = useState([]);
  const [responses, setResponses] = useState([]);
  const [stream, setStream] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;

    // hit user API route, get all data
    getUser(clearSession).then(body => {
      if (isSubscribed) {
        setUserData(body.user);
        setJobs(body.links.filter(link => link.generation === 0));
        setLinks(body.links.filter(link => link.generation !== 0));
        setStream(body.stream);
        setResponses(body.responses);
        // setPayments(body.payments);
        setIsLoading(false);
      }
    });

    // cleanup
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <div className="container user-container">
      <div className="grid grid-2">
        <div>
          <div className="user-profile">
            <ProfilePic avatarUrl={userData.avatar} />
            <div className="user-info">
              <div className="user-name">
                <Link to="/profile">{userData.displayName}</Link>
              </div>
              <div className="user-location">Earnings: {formatCurrency(0)}</div>
            </div>
          </div>
          <JobBoard userData={userData} />
        </div>
        <div></div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              <div className="panel">
                <div className="tab-panel-title">Create Your Job Board</div>

                <p>You can promote any job on Talent Relay</p>

                <LinksTable links={links} />

                <div style={{ textAlign: 'center' }}>
                  <Link to="/search" className="btn btn-theme btn-sm">
                    Search for Jobs
                  </Link>
                </div>
              </div>

              <div className="panel">
                <div className="tab-panel-title">Get a Job → Get Paid</div>
                <p>
                  Every job on Talent Relay includes a cash bonus once you land
                  the job.
                </p>
                <ResponseList responses={responses} />
                <div style={{ textAlign: 'center' }}>
                  <Link to="/search" className="btn btn-theme btn-sm">
                    Search for Jobs
                  </Link>
                </div>
              </div>

              <div className="panel">
                <div className="tab-panel-title">
                  Find Great Candidates, Fast
                </div>
                <p>Just post your job and watch the community go to work</p>
                <JobTable links={jobs} />
                <div style={{ textAlign: 'center' }}>
                  {userData.hasPaymentSource ? (
                    <Link to="/addquery" className="btn btn-theme btn-sm">
                      Post a Job
                    </Link>
                  ) : (
                    <div>
                      <p>
                        <i>
                          Add a payment source to your{' '}
                          <Link to="/profile">profile</Link> in order to post a
                          job
                        </i>
                      </p>
                      <button disabled className="btn btn-theme btn-sm">
                        Post a Job
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* stream */}
        <div className="col-lg-4">
          <div>
            <StreamList stream={stream} userId={userData._id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;

async function getUser(clearSession) {
  return await fetch('/api/user').then(response => {
    if (response.status === 200) {
      return response.json();
    }

    // some type of error has occured...
    if (response.status === 401) {
      // logout with context function
      console.log(response.status, 'logging out...');
      clearSession();
    }

    console.log(response.status);
    return {};
  });
}
