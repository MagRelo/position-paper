import React, { useState, useEffect, useContext } from 'react';
// import { Link } from '@reach/router';

import { Tabs, TabList, TabPanels, TabPanel } from '@reach/tabs';
import { formatCurrency, CoolTab, Loading } from 'components/util/random';

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
      <div className="row">
        <div className="col-lg-8">
          <h2>Dashboard</h2>
          {isLoading ? (
            <Loading />
          ) : (
            <Tabs style={{ marginTop: '1em' }}>
              <TabList style={{ marginBottom: '1em' }}>
                <CoolTab count={links.length}>Promote Jobs</CoolTab>
                <CoolTab count={responses.length}>My Applications</CoolTab>
                <CoolTab count={jobs.length}>My Jobs</CoolTab>
                <CoolTab count={responses.length}>My Employers</CoolTab>
              </TabList>

              <TabPanels>
                {/* Links */}
                <TabPanel style={{ outline: 'none' }}>
                  <LinksTable links={links} />
                </TabPanel>

                {/* Responses */}
                <TabPanel style={{ outline: 'none' }}>
                  <div>
                    <ResponseList responses={responses} />
                  </div>
                </TabPanel>

                {/* Jobs */}
                <TabPanel style={{ outline: 'none' }}>
                  <JobTable links={jobs} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </div>

        {/* stream */}
        <div className="col-lg-4">
          <div>
            <div className="user-profile">
              <button
                style={{ float: 'right' }}
                className="btn btn-sm btn-theme"
                onClick={() => {
                  clearSession();
                }}
              >
                Log Out
              </button>
              <img src={userData.avatar} alt="avatar" className="user-avatar" />
              <div className="user-info">
                <div className="user-name">{userData.name}</div>
                <div className="user-location">
                  Earnings: {formatCurrency(userData.pending || 0)}
                </div>
              </div>
            </div>
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
