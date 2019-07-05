import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UserSocial from 'components/userSocial';
// import UserBankAccount from 'components/userBankAccount';

import LinksList from './userLinksTable';
import QueryList from './userQueryTable';
import StreamList from './userStream';

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
        <div className="row row-2">
          <div>
            <h3 className="section-header">Account Information</h3>

            <div style={{ margin: '0 1em' }}>
              <p>Name: {this.state.name}</p>
              <p>Email: {this.state.email}</p>
              <p>Balance: $452.00</p>
              <p>Bank Account Status: Not Connected</p>
            </div>
          </div>
          <div>
            <h3 className="section-header">Social Accounts</h3>
            <UserSocial />
          </div>
        </div>

        <div className="row row-3">
          <div>
            <h3 className="section-header">Activity</h3>
            <StreamList stream={this.state.stream} />
          </div>

          <div>
            <h3 className="section-header">Links</h3>
            <LinksList links={this.state.links} />
          </div>

          <div>
            <h3 className="section-header">Requests</h3>

            <QueryList queries={this.state.queries} />
            <Link
              to="/addquery"
              className="pure-button pure-button-primary"
              style={{ float: 'right', marginTop: '0.8em' }}
            >
              Add Query
            </Link>
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
