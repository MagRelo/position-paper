import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

import LinkForm from './createLink';

class Profile extends Component {
  state = { contactOpen: false, linkOpen: false, name: '' };

  async componentDidMount() {
    // get linkId from URL
    const linkId = this.props.match.params.linkId;

    // get position data
    const response = await fetch('/api/link/' + linkId);
    if (response.status === 200) {
      const responseObj = await response.json();

      // console.log(query);

      this.setState({
        name: responseObj.query.title,
        description: responseObj.query.description,
        payoff: responseObj.link.payoff,
        userPayoff: responseObj.link.userPayoff,
        isUser: responseObj.link.isUser
      });
    } else {
      console.log('not found', response.status);
    }
  }

  formatCurrency(input) {
    if (typeof input === 'number') {
      return input.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      });
    }
    return '';
  }

  render() {
    return (
      <div>
        <div className="panel">
          <h2>{this.state.name}</h2>
          <p>Description: {this.state.description}</p>

          <button
            className="pure-button pure-button-primary"
            style={{ marginBottom: '1em' }}
            onClick={() => this.setState({ contactOpen: true })}
          >
            Apply – {this.formatCurrency(this.state.payoff)}
          </button>
          <Dialog
            isOpen={this.state.contactOpen}
            onDismiss={() => this.setState({ contactOpen: false })}
          >
            <p>(UI needed to request payment)</p>
          </Dialog>
        </div>

        <button
          className="pure-button pure-button-primary"
          style={{ marginTop: '1em' }}
          onClick={() => this.setState({ contactOpen: true })}
          disabled
        >
          Promote for {this.formatCurrency(this.state.userPayoff)}
        </button>

        <hr />

        <h2>Link Admin</h2>

        <p>
          This is your link. If it is claimed you will get{' '}
          {this.formatCurrency(this.state.userPayoff)} and they will get{' '}
          {this.formatCurrency(this.state.payoff)}
        </p>

        <div className="row row-2">
          <div>
            <h3>Share</h3>
            <p>Share with your network to increase your income.</p>
            <div>
              <span
                className="icon"
                name="gmail"
                style={{
                  background: '#D14836'
                }}
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Gmail icon</title>
                  <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.649 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068C.7 3.16 1.076 3 1.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z" />
                </svg>
              </span>
            </div>

            <div>
              <span
                className="icon"
                name="twitter"
                style={{
                  background: '#1DA1F2'
                }}
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Twitter icon</title>
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                </svg>
              </span>
            </div>

            <div>
              <span
                className="icon"
                name="linkedin"
                style={{
                  background: '#0077B5'
                }}
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>LinkedIn icon</title>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </span>
            </div>

            <Dialog
              isOpen={this.state.linkOpen}
              onDismiss={() => this.setState({ linkOpen: false })}
            >
              <LinkForm parentLinkId={this.state.linkId} />
            </Dialog>
          </div>

          <div>
            <h3>Activity</h3>
            <p>Optimize your sources to increse your reach.</p>
            <p>Views: {this.state.views}</p>
          </div>
        </div>
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
