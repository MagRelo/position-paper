import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class InfoPanel extends Component {
  state = { accounts: null, links: [] };

  render() {
    return (
      <div className="header">
        <div className="menu">
          <Link to="/about">About</Link>
        </div>

        <h1>
          <Link to="/">Social Referrals</Link>
        </h1>

        <h2>Activate and reward your network</h2>
      </div>
    );
  }
}

export default InfoPanel;
