import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

import LinkForm from './createLink';
// import ContactForm from './contactForm';

class Profile extends Component {
  state = { contactOpen: false, linkOpen: false };

  async componentDidMount() {
    // get linkId from URL
    const linkId = this.props.match.params.linkId;

    // get position data
    const response = await fetch('/api/profile/' + linkId);
    if (response.status === 200) {
      const body = await response.json();
      this.setState(Object.assign(body, { linkId }));
    } else {
      console.log('not found', response.status);
    }
  }

  generateButtons() {
    return (
      <div>
        <button
          className="pure-button pure-button-primary"
          onClick={() => this.setState({ contactOpen: true })}
        >
          Activate Referral
        </button>
        <Dialog
          isOpen={this.state.contactOpen}
          onDismiss={() => this.setState({ contactOpen: false })}
        >
          <p>(UI needed to request payment)</p>
        </Dialog>

        <button
          className="pure-button pure-button-primary"
          onClick={() => this.setState({ linkOpen: true })}
        >
          Create Link
        </button>

        <Dialog
          isOpen={this.state.linkOpen}
          onDismiss={() => this.setState({ linkOpen: false })}
        >
          <LinkForm parentLinkId={this.state.linkId} />
        </Dialog>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.generateButtons()}

        <div className="row row-3">
          <div>
            <p>profile pic</p>
          </div>
          <div>
            <h2>{this.state.name}</h2>
            <p>bio</p>
          </div>
        </div>
        <hr />
        <div className="row row-2">
          <div>
            <p>linkedin: {this.state.linkedin}</p>
            <p>github: {this.state.github}</p>
          </div>
          <div>
            <p>twitter: {this.state.twitter}</p>
            <p>medium: {this.state.medium}</p>
          </div>
        </div>

        {this.generateButtons()}
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
