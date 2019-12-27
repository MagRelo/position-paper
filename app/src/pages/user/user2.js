import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@reach/router';

import { Tabs, TabList, TabPanels, TabPanel } from '@reach/tabs';
import {
  lineItem,
  formatCurrency,
  CoolTab,
  Loading
} from 'components/util/random';

import PaymentsTable from './userPaymentsTable';
import ResponseList from './userResponseTable';
import JobTable from './userJobsTable';
import LinksTable from './userLinksTable';
import StreamList from './userStream';

import { AuthContext } from 'App';

function User(props) {
  const authContext = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(authContext.user);
  const [links, setLinks] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [payments, setPayments] = useState([]);
  const [responses, setResponses] = useState([]);
  const [stream, setStream] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;

    // hit user API route, get all data
    getUser(authContext.clearSession).then(body => {
      if (isSubscribed) {
        setUserData(body.user);
        setJobs(body.links.filter(link => link.generation === 0));
        setLinks(body.links.filter(link => link.generation !== 0));
        setStream(body.stream);
        setResponses(body.responses);
        setPayments(body.payments);
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
                <CoolTab count={jobs.length}>Post a Job</CoolTab>
                <CoolTab count={links.length}>Promote Jobs</CoolTab>
                <CoolTab count={responses.length}>My Applications</CoolTab>
              </TabList>

              <TabPanels>
                {/* Jobs */}
                <TabPanel style={{ outline: 'none' }}>
                  <JobTable links={jobs} />
                </TabPanel>

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
              </TabPanels>
            </Tabs>
          )}
        </div>

        {/* stream */}
        <div className="col-lg-4">
          <div>
            <div className="user-profile">
              <img src={userData.avatar} alt="avatar" className="user-avatar" />
              <div className="user-info">
                <div className="user-name">{userData.name}</div>
                <div className="user-location">
                  Earnings: {userData.pending || '$0'}
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
  });
}
