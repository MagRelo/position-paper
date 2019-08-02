import React, { Component } from 'react';

class LandingPage extends Component {
  state = { accounts: null };

  render() {
    return (
      <React.Fragment>
        <section>
          <h1>Legal</h1>
          <ul>
            <li>terms of service</li>
            <li>privacy policies</li>
            <li>terms and conditions of website use</li>
            <li>end user documents</li>
            <li>intra-customer and intra-user documents</li>
          </ul>
        </section>
      </React.Fragment>
    );
  }
}

export default LandingPage;
