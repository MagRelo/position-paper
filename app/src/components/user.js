import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { lineItem, formatCurrency } from 'components/util/random';

import UserSocial from 'components/userSocial';
import LoginPlaidLink from 'components/loginPlaidLink';
import LinksList from 'components/userLinksTable';
import StreamList from 'components/userStream';

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
            <h3 className="section-header">Deal Flow</h3>
            <LinksList links={this.state.links} />

            <Link
              to="/addquery"
              className="pure-button pure-button-primary"
              style={{ float: 'right', marginTop: '0.8em' }}
            >
              Add Request
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
