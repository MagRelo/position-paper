import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

import LinkForm from './linkForm';
import ContactForm from './contactForm';

class Profile extends Component {
  state = { contactOpen: false, linkOpen: false };

  async componentDidMount() {
    // get linkId from URL
    const linkId = this.props.match.params.linkId;

    // get data from server for this link
    const response = await fetch('/api/profile/' + linkId);
    const body = await response.json();

    this.setState(Object.assign(body, { linkId }));
  }

  generateButtons() {
    return (
      <div>
        <button
          className="pure-button pure-button-primary"
          onClick={() => this.setState({ contactOpen: true })}
        >
          Contact
        </button>
        <Dialog
          isOpen={this.state.contactOpen}
          onDismiss={() => this.setState({ contactOpen: false })}
        >
          <ContactForm />
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
          <LinkForm />
        </Dialog>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.generateButtons()}

        <h2>{this.state.name}</h2>
        <div className="row row-3">
          <div>
            <p>profile pic</p>
          </div>
          <div>
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
