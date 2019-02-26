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
          <Link to="/">Servesa</Link>
        </h1>

        <h2>de·fi investment groups</h2>
      </div>
    );
  }
}

export default InfoPanel;
