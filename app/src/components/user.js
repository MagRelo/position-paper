import React, { Component } from 'react';
import { connect } from 'react-redux';

import LinksList from './userLinksList';
import QueryList from './userQueryList';

class Profile extends Component {
  state = { linkOpen: false };

  render() {
    return (
      <div>
        <h2>My Name</h2>

        <hr />
        <div className="row row-2">
          <LinksList />
          <QueryList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedAccount: state.account.selectedAccount,
    activeSession: !!state.account.expires
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
