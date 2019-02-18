import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

// CSS
import './css/open-sans.css';
import './css/pure-min.css';
import './index.css';
import './app.css';

import About from 'components/about';
import LandingPage from 'components/landingPage';
import CreatePortfolio from 'components/createPortfolio';
import AcceptInvite from 'components/acceptInvite';
import Auto from 'components/util/autoPage';

class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="header">
            <div className="menu">
              <Link to="/about">About</Link>
            </div>

            <h1>
              <Link to="/">Smarty</Link>
            </h1>

            <h2>Curation Tournaments</h2>
          </div>

          <Switch>
            <Route path="/auto" component={Auto} />
            <Route path="/create" component={CreatePortfolio} />
            <Route path="/invite" component={AcceptInvite} />
            <Route path="/about" component={About} />

            <Route component={LandingPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
