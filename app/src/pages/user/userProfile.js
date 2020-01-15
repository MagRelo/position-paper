import React, { useState, useEffect, useContext } from 'react';
// import { Link } from '@reach/router';
// import { Tabs, TabList, TabPanels, TabPanel } from '@reach/tabs';
// import { formatCurrency, Loading } from 'components/random';

import { formatCurrency, Loading, JobBoard } from 'components/random';

import UserBankAccount from 'pages/user/userBankAccount';
import UserPaymentSource from 'pages/user/userPaymentSource';
import UserPaymentTable from 'pages/user/userPaymentTable';
import UserProfileForm from 'pages/user/userProfileForm';

import StreamList from './userStream';

import { AuthContext } from 'App';

function User(props) {
  const { clearSession, user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(user);
  // const [links, setLinks] = useState([]);
  // const [jobs, setJobs] = useState([]);
  const [payments, setPayments] = useState([]);
  // const [responses, setResponses] = useState([]);
  const [stream, setStream] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;

    // hit user API route, get all data
    getUser(clearSession).then(body => {
      if (isSubscribed) {
        setUserData(body.user);
        // setJobs(body.links.filter(link => link.generation === 0));
        // setLinks(body.links.filter(link => link.generation !== 0));
        setStream(body.stream);
        // setResponses(body.responses);
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
          {isLoading ? (
            <Loading />
          ) : (
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
                <img
                  src={userData.avatar}
                  alt="avatar"
                  className="user-avatar"
                />
                <div className="user-info">
                  <div className="user-name">{userData.displayName}</div>

                  <div className="user-location">
                    Earnings: {formatCurrency(userData.pending || 0)}
                  </div>
                </div>
              </div>

              <div style={{ margin: '2em 0 ' }}>
                <h2>Bank Account</h2>
                <UserBankAccount
                  hasAccount={userData.hasAccount}
                  bankLabel={userData.stripeAccountLabel}
                  bankBrand={userData.stripeAccountBrand}
                />
              </div>

              <div style={{ margin: '2em 0 ' }}>
                <h2>Payment Source</h2>
                <UserPaymentSource
                  hasPaymentSource={userData.hasPaymentSource}
                  sourceLabel={userData.stripeCustomerLabel}
                  sourceBrand={userData.stripeCustomerBrand}
                />
              </div>

              <div style={{ margin: '2em 0 ' }}>
                <h2>Edit Profile</h2>
                <UserProfileForm user={userData} />
              </div>

              <div style={{ margin: '2em 0 ' }}>
                <h2>Payments</h2>
                <UserPaymentTable payments={payments} />
              </div>
            </div>
          )}
        </div>

        {/* stream */}
        <div className="col-lg-4">
          <h2>Activity</h2>
          <StreamList stream={stream} userId={userData._id} />
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
