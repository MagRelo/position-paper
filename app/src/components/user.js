import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Tabs, TabList, TabPanels, TabPanel } from '@reach/tabs';
import { lineItem, formatCurrency, CoolTab } from 'components/util/random';

import PaymentsTable from 'components/userPaymentsTable';
import ResponseList from 'components/userResponseTable';
import SocialIcon from 'components/socialButton';
import LoginPlaidLink from 'components/loginPlaidLink';
import LinksList from 'components/userLinksTable';
import StreamList from 'components/userStream';

class Profile extends Component {
  state = {
    name: '',
    email: '',
    links: [],
    queries: [],
    stream: [],
    responses: [],
    payments: []
  };

  async componentDidMount() {
    // get user
    await fetch('/api/user', {
      method: 'GET'
    }).then(async response => {
      if (response.status === 200) {
        const user = await response.json();

        this.setState({
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          location: user.location,
          userId: user._id,
          links: user.links,
          stream: user.stream,
          responses: user.responses,
          payments: user.payments
        });
      } else {
        console.log('user not found', response.status);
      }
    });

    // const friends = await fetch('/api/user/friends', {
    //   method: 'GET'
    // }).then(response => {
    //   if (response.status === 200) {
    //     return response.json();
    //   }

    //   return response.status;
    // });

    // console.log(friends);
  }

  render() {
    return (
      <div>
        <div className="row row-3">
          <div>
            <h3 className="section-header">Profile</h3>

            <div className="user-profile">
              <img
                src={this.state.avatar}
                alt="avatar"
                className="user-avatar"
              />
              <div className="user-info">
                <div className="user-name">{this.state.name}</div>
                <div className="user-location">{this.state.location}</div>
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
            <StreamList stream={this.state.stream} userId={this.state.userId} />
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
                  <LinksList links={this.state.links} />
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
                    <ResponseList responses={this.state.responses} />
                  </div>
                </TabPanel>

                <TabPanel>
                  <PaymentsTable payments={this.state.payments} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
