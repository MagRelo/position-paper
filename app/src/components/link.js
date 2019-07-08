import React, { Component } from 'react';

import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

import { formatCurrency } from 'components/util/random';

import LinkForm from './createLink';
import ResponseForm from './createResponse';
import LinkAdmin from './linkAdmin';

class Profile extends Component {
  state = {
    contactOpen: false,
    linkOpen: false,
    name: '',
    potentialPayoffs: [],
    payoffs: []
  };

  async componentDidMount() {
    // get linkId from URL
    const linkId = this.props.match.params.linkId;

    // get position data
    const response = await fetch('/api/link/' + linkId);
    if (response.status === 200) {
      const responseObj = await response.json();

      // console.log(responseObj);

      this.setState({
        linkId: linkId,
        queryId: responseObj.query._id,
        name: responseObj.query.title,
        description: responseObj.query.description,
        payoffs: responseObj.link.payoffs,
        potentialPayoffs: responseObj.link.potentialPayoffs,
        isQueryOwner: responseObj.link.isQueryOwner,
        isLinkOwner: responseObj.link.isLinkOwner,
        generation: responseObj.link.generation
      });
    } else {
      console.log('not found', response.status);
    }
  }

  async sendResponse(formData) {
    console.log(formData);

    // add params
    formData.queryId = this.state.queryId;
    formData.linkId = this.state.linkId;

    const response = await fetch('/api/response/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (response.status === 200) {
      const responseObj = await response.json();
      console.log(responseObj);

      // this.setState({
      //   linkId: linkId,
      // });
    } else {
      console.log('not found', response.status);
    }
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
            disabled={this.state.isLinkOwner}
            onClick={() => this.setState({ contactOpen: true })}
          >
            Apply – {formatCurrency(this.state.payoffs[0])}
          </button>
          <Dialog
            isOpen={this.state.contactOpen}
            onDismiss={() => this.setState({ contactOpen: false })}
          >
            <ResponseForm submit={this.sendResponse.bind(this)} />
          </Dialog>
        </div>

        {this.state.isLinkOwner ? (
          <LinkAdmin
            payoff={this.state.payoffs[0]}
            userPayoff={
              this.state.generation
                ? this.state.payoffs[this.state.generation]
                : 0
            }
          />
        ) : (
          <React.Fragment>
            <button
              className="pure-button pure-button-primary"
              style={{ marginTop: '1em' }}
              onClick={() => this.setState({ linkOpen: true })}
            >
              Promote for{' '}
              {formatCurrency(
                this.state.potentialPayoffs[this.state.generation + 1]
              )}
            </button>
            <Dialog
              isOpen={this.state.linkOpen}
              onDismiss={() => this.setState({ linkOpen: false })}
            >
              <LinkForm
                queryId={this.state.queryId}
                parentLink={this.state.linkId}
              />
            </Dialog>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Profile;
