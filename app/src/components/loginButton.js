import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadSession, clearSession } from './util/authActions';

import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

import UserLogin from './loginForm';

class LoginButton extends Component {
  state = { accounts: null, loginOpen: false };

  componentDidMount() {
    this.props.getSession(this.props.selectedAccount);
  }

  logout() {
    this.props.clearSession();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.activeSession ? (
          <button
            className="pure-button pure-button-primary"
            onClick={this.logout.bind(this)}
          >
            Logout
          </button>
        ) : (
          <React.Fragment>
            <button
              className="pure-button pure-button-primary"
              onClick={() => this.setState({ loginOpen: true })}
            >
              Login
            </button>

            <Dialog
              isOpen={this.state.loginOpen}
              onDismiss={() => this.setState({ loginOpen: false })}
            >
              <UserLogin />
            </Dialog>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeSession: !!state.account.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearSession: () => {
      dispatch(clearSession());
    },
    getSession: selectedAccount => {
      dispatch(loadSession(selectedAccount));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton);
