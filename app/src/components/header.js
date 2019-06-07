import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoginButton from './login';
import { connect } from 'react-redux';

class Header extends Component {
  state = { accounts: null };

  render() {
    return (
      <div className="header">
        <div className="menu">
          <React.Fragment>
            <Link to={'/user/' + this.props.selectedAccount}>Account</Link>
          </React.Fragment>

          <span>|</span>
          <LoginButton />
        </div>

        <h1>
          <Link to="/">Social Referrals</Link>
        </h1>

        <h2>Activate and reward your network</h2>
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
export default connect(
  mapStateToProps,
  null
)(Header);
