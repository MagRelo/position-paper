import React, { Component } from 'react';
import { connect } from 'react-redux';

import WarningIcon from 'images/warning.svg';

import { loadSession, saveSession, clearSession } from './authActions';

class AuthWrapper extends Component {
  componentDidUpdate(prevState) {
    if (prevState.selectedAccount !== this.props.selectedAccount) {
      loadSession();
    }
  }

  logout() {
    // this.setState({ systemInfo: null });
    clearSession();
  }

  createSession(duration) {
    console.log('hit createSession');
    // this.setState({ alert: false });
    this.props.createSession(duration);
  }

  selectMessage() {
    const networkConnectionDocs = 'https://google.com';

    let message = '';
    if (!this.props.networkReady || !this.props.contractsReady) {
      message = `Please make sure you are connected to the right network.
      <br/><br/> See our <a href="${networkConnectionDocs}" target="_blank" rel="noopener noreferrer">documentation</a> for more information.`;
    }
    return { __html: message };
  }
  // <p dangerouslySetInnerHTML={this.selectMessage()} />

  showChildren() {
    return this.props.activeSession;
  }

  render() {
    return (
      <React.Fragment>
        {this.showChildren() ? (
          { ...this.props.children }
        ) : (
          <div className="loader" style={{ minHeight: '150px' }}>
            <div>
              <img
                src={WarningIcon}
                alt="warning icon"
                style={{ marginTop: '1em' }}
              />

              <p>Auth Error</p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: '1fr',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  margin: '0.5em 0 1em',
                  gridGap: '1em'
                }}
              >
                <button
                  name="1"
                  type="button"
                  className="pure-button pure-button-primary"
                  onClick={this.createSession.bind(this, 1)}
                >
                  1 minute
                </button>
                <button
                  name="30"
                  type="button"
                  className="pure-button pure-button-primary"
                  onClick={this.createSession.bind(this, 30)}
                >
                  30 minutes
                </button>
                <button
                  name="90"
                  type="button"
                  className="pure-button pure-button-primary"
                  onClick={this.createSession.bind(this, 90)}
                >
                  90 minutes
                </button>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
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
  return {
    createSession: duration => {
      dispatch(saveSession(duration));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthWrapper);
