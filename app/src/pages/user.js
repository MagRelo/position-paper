import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Tabs, TabList, TabPanels, TabPanel } from '@reach/tabs';
import { lineItem, formatCurrency, CoolTab } from 'components/util/random';

import PaymentsTable from 'components/userPaymentsTable';
import ResponseList from 'components/userResponseTable';
import SocialIcon from 'components/socialButton';
import LoginPlaidLink from 'components/loginPlaidLink';
import LinksList from 'components/userLinksTable';
import StreamList from 'components/userStream';

function User(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [links, setLinks] = useState({});
  const [payments, setPayments] = useState({});
  const [responses, setResponses] = useState([]);
  const [stream, setStream] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    try {
      // hit user API route, get all data
      getUser().then(body => {
        setUserData(body.user);
        setLinks(body.links);
        setStream(body.stream);
        setResponses(body.responses);
        setPayments(body.payments);
        setIsLoading(false);
      });
    } catch (error) {
      console.log('401 - redirecting...');
      props.history.push('/');
    }
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <div className="spinner" style={{ margin: '0 auto' }}>
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
          </div>
        </div>
      ) : (
        <div>
          <div className="row row-3">
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
                  <div className="user-location">{userData.location}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="section-header">Social Accounts</h3>
              <div className="social-grid">
                <SocialIcon company="gmail" />
                <SocialIcon company="linkedin" />
                <SocialIcon company="twitter" enabled="true" />
                <SocialIcon company="instagram" />
              </div>
            </div>

            <div>
              <h3 className="section-header">Bank Account</h3>
              {lineItem('Balance', formatCurrency(0))}
              <p style={{ textAlign: 'center' }}>
                <LoginPlaidLink />
              </p>
            </div>
          </div>

          <div className="row row-3-5">
            <div>
              <h3 className="section-header">Activity</h3>
              <StreamList stream={stream} userId={userData._id} />
            </div>

            <div>
              <h3 className="section-header">Stuff</h3>

              <Tabs style={{ marginTop: '0.5em' }}>
                <TabList style={{ marginBottom: '0.5em' }}>
                  <CoolTab>Links</CoolTab>
                  <CoolTab>Responses</CoolTab>
                  <CoolTab>Payments</CoolTab>
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
                </TabPanels>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;

async function getUser() {
  return await fetch('/api/user').then(response => response.json());
}

// async componentDidMount() {
//   // get user
//   await fetch('/api/user', {
//     method: 'GET'
//   }).then(async response => {
//     if (response.status === 200) {
//       const user = await response.json();

//       this.setState({
//         name: user.name,
//         email: user.email,
//         avatar: user.avatar,
//         location: user.location,
//         userId: user._id,
//         links: user.links,
//         stream: user.stream,
//         responses: user.responses,
//         payments: user.payments
//       });
//     } else {
//       console.log('user not found', response.status);
//     }
//   });

//   // const friends = await fetch('/api/user/friends', {
//   //   method: 'GET'
//   // }).then(response => {
//   //   if (response.status === 200) {
//   //     return response.json();
//   //   }

//   //   return response.status;
//   // });

//   // console.log(friends);
// }
