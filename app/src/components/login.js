import React, { Component } from 'react';
import { connect } from 'react-redux';

import NewUser from './userSignup';
import Login from './userLogin';

class Inbox extends Component {
  state = { accounts: null };

  render() {
    return (
      <div className="row row-2">
        <Login />
        <NewUser />
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
)(Inbox);
