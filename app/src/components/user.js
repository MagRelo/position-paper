import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@reach/tabs';

import UserSocial from 'components/userSocial';
// import UserBankAccount from 'components/userBankAccount';

import LoginPlaidLink from './loginPlaidLink';
import LinksList from './userLinksTable';
import QueryList from './userQueryTable';
import StreamList from './userStream';

function CoolTab(props) {
  // `isSelected` comes from `TabList` cloning the `CoolTab`.
  const { isSelected, children } = props;

  // make sure to forward *all* props received from TabList
  return (
    <Tab
      {...props}
      style={{
        background: 'none',
        border: 'none',
        color: '#0279db',
        borderBottom: isSelected ? 'solid 1px' : 'none',
        marginRight: '1em'
      }}
    >
      {children}
    </Tab>
  );
}

class Profile extends Component {
  state = { name: '', email: '', links: [], queries: [], stream: [] };

  async componentDidMount() {
    const response = await fetch('/api/user', {
      method: 'GET'
    });

    if (response.status === 200) {
      const user = await response.json();
      this.setState({
        name: user.name,
        email: user.email,
        userId: user._id,
        links: user.links,
        queries: user.queries,
        stream: user.stream
      });
    } else {
      console.log('not found', response.status);
    }
  }

  render() {
    return (
      <div>
        <div className="row row-5-3">
          <div className="row row-2">
            <div>
              <h3 className="section-header">Profile</h3>
              <div style={{ margin: '0 1em' }}>
                <p>Name: {this.state.name}</p>
                <p>Email: {this.state.email}</p>
              </div>
            </div>

            <div>
              <h3 className="section-header">Account Information</h3>
              <div style={{ margin: '0 1em' }} />
              <p>
                <LoginPlaidLink />
              </p>
            </div>
          </div>

          <div>
            <h3 className="section-header">Social Accounts</h3>
            <UserSocial />
          </div>
        </div>

        <div className="row row-3-5">
          <div>
            <h3 className="section-header">Activity</h3>
            <StreamList stream={this.state.stream} userId={this.state.userId} />
          </div>

          <div>
            <h3 className="section-header">Deal Flow</h3>
            <Tabs style={{ marginTop: '0.5em' }}>
              <TabList style={{ marginBottom: '0.5em' }}>
                <CoolTab>Links</CoolTab>
                <CoolTab>Requests</CoolTab>
              </TabList>

              <TabPanels>
                <TabPanel style={{ outline: 'none' }}>
                  <LinksList links={this.state.links} />
                </TabPanel>

                <TabPanel style={{ outline: 'none' }}>
                  <QueryList queries={this.state.queries} />

                  <Link
                    to="/addquery"
                    className="pure-button pure-button-primary"
                    style={{ float: 'right', marginTop: '0.8em' }}
                  >
                    Add Request
                  </Link>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedAccount: state.account.selectedAccount,
    activeSession: !!state.account.expires
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
