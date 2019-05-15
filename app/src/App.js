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
import createProfile from 'components/createProfile';
import Profile from 'components/profile';
// import AcceptInvite from 'components/acceptInvite';
// import Auto from 'components/util/autoPage';
// import allGroups from 'components/allGroups';
// import Lobby from 'components/lobby/lobbyPage';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/create" component={createProfile} />
          <Route path="/profile/:linkId" component={Profile} />

          <Route path="/about" component={About} />
          <Route component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
