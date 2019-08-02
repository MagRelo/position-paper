import React, { Component } from 'react';

class LandingPage extends Component {
  state = { accounts: null };

  render() {
    return (
      <React.Fragment>
        <section>
          <h1>About</h1>
          <p>Servesa, Inc. 2019</p>
        </section>
      </React.Fragment>
    );
  }
}

export default LandingPage;
