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
      const query = await response.json();

      // console.log(query);

      this.setState({
        name: query.data.name,
        bonus: query.data.bonus,
        description: query.data.description
      });
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
        <div>
          <h2>{this.state.name}</h2>
          <p>Bonus: {this.state.bonus}</p>
          <p>Description: {this.state.description}</p>
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
