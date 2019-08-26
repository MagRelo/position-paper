import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Tabs, TabList, TabPanels, TabPanel } from '@reach/tabs';
import {
  lineItem,
  formatCurrency,
  CoolTab,
  Loading
} from 'components/util/random';

import SocialIcon from 'components/socialButton';

import PaymentsTable from './userPaymentsTable';
import ResponseList from './userResponseTable';
import LinksList from './userLinksTable';
import StreamList from './userStream';

import { AuthContext } from 'App';

function User(props) {
  const authContext = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [links, setLinks] = useState({});
  const [payments, setPayments] = useState({});
  const [responses, setResponses] = useState([]);
  const [stream, setStream] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    let isSubscribed = true;

    // hit user API route, get all data
    getUser(authContext.clearSession).then(body => {
      if (isSubscribed) {
        setUserData(body.user);
        setLinks(body.links);
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
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="user-profile">
            <img src={userData.avatar} alt="avatar" className="user-avatar" />
            <div className="user-info">
              <div className="user-name">{userData.name}</div>
              <div className="user-location">{userData.location}</div>
            </div>
          </div>

          <div className="row row-6-1">
            {/* content */}
            <div>
              <Tabs style={{ marginTop: '0.5em' }}>
                <TabList style={{ marginBottom: '0.5em' }}>
                  <CoolTab>Links</CoolTab>
                  <CoolTab>Responses</CoolTab>
                  <CoolTab>Payments</CoolTab>
                  <CoolTab>Profile</CoolTab>
                </TabList>

                <TabPanels>
                  <TabPanel style={{ outline: 'none' }}>
                    <LinksList links={links} />
                    <Link
                      to="/addquery"
                      className="pure-button pure-button-primary"
                      style={{ float: 'right', marginTop: '1.5em' }}
                    >
                      Add Job
                    </Link>
                  </TabPanel>

                  <TabPanel style={{ outline: 'none' }}>
                    <div>
                      <ResponseList responses={responses} />
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <PaymentsTable payments={payments} />
                  </TabPanel>

                  <TabPanel>
                    <div>
                      <h3 className="section-header">Profile</h3>

                      <div className="user-profile">
                        <img
                          src={userData.avatar}
                          alt="avatar"
                          className="user-avatar"
                        />
                        <div className="user-info">
                          <div className="user-name">{userData.name}</div>
                          <div className="user-location">
                            {userData.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="section-header">Social Accounts</h3>
                      <div className="social-grid">
                        <SocialIcon company="gmail" enabled="true" />
                        <SocialIcon company="linkedin" />
                        <SocialIcon company="twitter" enabled="true" />
                        <SocialIcon company="instagram" />
                      </div>
                    </div>

                    <div>
                      <h3 className="section-header">Bank Account</h3>
                      {lineItem('Pending Balance', formatCurrency(0))}

                      {userData.hasAccount ? (
                        lineItem('Account', userData.stripeAccountLabel)
                      ) : (
                        <p style={{ textAlign: 'center' }}>
                          <Link to="/user/account">Link Bank Account</Link>
                        </p>
                      )}
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>

            {/* stream */}
            <div>
              <h3 className="section-header">Activity</h3>
              <StreamList stream={stream} userId={userData._id} />
            </div>
          </div>
        </div>
      )}
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
