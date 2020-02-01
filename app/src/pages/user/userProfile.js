import React, { useState, useEffect, useContext } from 'react';
// import { Link } from '@reach/router';
// import { Tabs, TabList, TabPanels, TabPanel } from '@reach/tabs';
// import { formatCurrency, Loading } from 'components/random';

import { Loading } from 'components/random';

import UserBankAccount from 'pages/user/userBankAccount';
import UserPaymentSource from 'pages/user/userPaymentSource';
import UserPaymentTable from 'pages/user/userPaymentTable';
import UserProfileForm from 'pages/user/userProfileForm';

// import StreamList from './userStream';

import { AuthContext } from 'App';

function User(props) {
  const { clearSession, user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(user);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;

    // hit user API route, get all data
    getUser(clearSession).then(body => {
      if (isSubscribed) {
        setUserData(body.user);
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
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-3-5">
          <div>
            <button
              className="btn btn-sm"
              style={{ float: 'right' }}
              onClick={() => {
                console.log('hit');
                return clearSession();
              }}
            >
              log out
            </button>

            <h2>Edit Profile</h2>
            <UserProfileForm user={userData} />
          </div>

          <div>
            <div>
              <h2>Payment Source</h2>
              <UserPaymentSource
                hasPaymentSource={userData.hasPaymentSource}
                sourceLabel={userData.stripeCustomerLabel}
                sourceBrand={userData.stripeCustomerBrand}
              />
            </div>

            <div>
              <h2>Bank Account</h2>
              <UserBankAccount
                hasAccount={userData.hasAccount}
                bankLabel={userData.stripeAccountLabel}
                bankBrand={userData.stripeAccountBrand}
              />
            </div>

            <div>
              <h2>Payments</h2>
              <UserPaymentTable payments={payments} />
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
    return {};
  });
}
