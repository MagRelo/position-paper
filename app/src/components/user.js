import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Tabs, TabList, TabPanels, TabPanel } from '@reach/tabs';
import { lineItem, formatCurrency, CoolTab } from 'components/util/random';

import QueryTable from 'components/userQueryTable';
import PaymentsTable from 'components/userPaymentsTable';
import ResponseList from 'components/queryResponseTable';
import UserSocial from 'components/userSocial';
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
    const response = await fetch('/api/user', {
      method: 'GET'
    });

    if (response.status === 200) {
      const user = await response.json();
      this.setState({
        name: user.name,
        email: user.email,
        userId: user._id,
        queries: user.links.filter(link => link.generation === 0),
        links: user.links.filter(link => link.generation !== 0),
        stream: user.stream,
        responses: user.responses,
        payments: user.payments
      });
    } else {
      console.log('not found', response.status);
    }
  }

  render() {
    return (
      <div>
        <div className="row row-3">
          <div>
            <h3 className="section-header">Profile</h3>
            {lineItem('Name', this.state.name)}
            {lineItem('Email', this.state.email)}
          </div>

          <div>
            <h3 className="section-header">Social Accounts</h3>
            <UserSocial />
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
                <CoolTab>Queries</CoolTab>
                <CoolTab>Links</CoolTab>
                <CoolTab>Responses</CoolTab>
                <CoolTab>Payments</CoolTab>
              </TabList>

              <TabPanels>
                <TabPanel style={{ outline: 'none' }}>
                  <QueryTable queries={this.state.queries} />
                  <Link
                    to="/addquery"
                    className="pure-button pure-button-primary"
                    style={{ float: 'right', marginTop: '1.5em' }}
                  >
                    Add Query
                  </Link>
                </TabPanel>

                <TabPanel style={{ outline: 'none' }}>
                  <LinksList links={this.state.links} />
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
