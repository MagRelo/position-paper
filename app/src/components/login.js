import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadSession, saveSession, clearSession } from './util/authActions';

import AuthWrapper from './util/authWrapper';
import Web3Wrapper from './util/web3Wrapper';

import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

class LoginButton extends Component {
  state = { accounts: null, loginOpen: false };
  componentDidMount() {
    this.props.getSession(this.props.selectedAccount);
  }

  logout() {
    this.props.clearSession();
  }

  createSession(duration) {
    this.setState({ loginOpen: false });
    this.props.createSession(duration);
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
              <Web3Wrapper skipContracts={true}>
                <AuthWrapper />
              </Web3Wrapper>
            </Dialog>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeSession: !!state.account.expires
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createSession: duration => {
      dispatch(saveSession(duration));
    },
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
