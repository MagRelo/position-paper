import React, { Component } from 'react';
import { connect } from 'react-redux';

import '@reach/dialog/styles.css';

import RefferalsList from './referralsList';

class Profile extends Component {
  state = { accounts: null, contactOpen: false, linkOpen: false };

  render() {
    return (
      <div>
        <h2>Name</h2>
        <div className="row row-3">
          <div>
            <p>profile pic</p>
          </div>
          <div>
            <p>bio</p>
          </div>
        </div>
        <hr />
        <RefferalsList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
