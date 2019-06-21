import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoginButton from './loginButton-2';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="menu">
          <React.Fragment>
            <Link to={'/user'}>Account</Link>
          </React.Fragment>

          <span>|</span>
          <LoginButton
            activeSession={this.props.activeSession}
            createSession={this.props.createSession}
          />
        </div>

        <h1>
          <Link to="/">Social Referrals</Link>
        </h1>

        <h2>Paid participation</h2>
      </div>
    );
  }
}

export default Header;
