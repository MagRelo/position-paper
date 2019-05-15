import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';

// contact form
// link form

import Header from './header';
import LinkForm from './linkForm';
import ContactForm from './contactForm';

class Profile extends Component {
  state = { accounts: null, contactOpen: false, linkOpen: false };

  buttons() {
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
        <Header />

        {this.buttons()}

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
        <div className="row row-2">
          <div>
            <p>linkedin</p>
            <p>github</p>
          </div>
          <div>
            <p>twitter</p>
            <p>medium</p>
          </div>
        </div>

        {this.buttons()}
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
