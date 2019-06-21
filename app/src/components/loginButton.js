import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadCookie, clearCookie } from './util/authActions';

import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

import UserLogin from './loginForm';

class LoginButton extends Component {
  state = { accounts: null, loginOpen: false };

  componentDidMount() {
    this.props.getSession();
  }

  logout() {
    this.props.clearSession();
  }

  render() {
    console.log('session:' + this.props.activeSession);
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
    activeSession: state.account.authCookie
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearSession: () => {
      dispatch(clearCookie());
    },
    getSession: selectedAccount => {
      dispatch(loadCookie());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton);
