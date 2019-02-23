import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// CSS
import './css/open-sans.css';
import './css/pure-min.css';
import './index.css';
import './app.css';

import About from 'components/about';
import LandingPage from 'components/landingPage';
import CreatePortfolio from 'components/createPortfolio';
import AcceptInvite from 'components/acceptInvite';

import allGroups from 'components/allGroups';
import Lobby from 'components/lobby/lobby';

import Auto from 'components/util/autoPage';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/auto" component={Auto} />
          <Route path="/create" component={CreatePortfolio} />
          <Route path="/invite" component={AcceptInvite} />
          <Route path="/about" component={About} />

          <Route path="/group/:contractAddress" component={Lobby} />
          <Route path="/group/" component={allGroups} />

          <Route component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
