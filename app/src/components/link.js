import React, { Component } from 'react';

import { formatCurrency } from 'components/util/random';

import LinkAdmin from './linkAdmin';

import LinkButton from 'components/linkButton';
import ResponseButton from 'components/responseButton';

class Profile extends Component {
  state = {
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

  render() {
    return (
      <div>
        <div className="panel">
          <h2>{this.state.name}</h2>
          <p>Description: {this.state.description}</p>
          <ResponseButton
            queryId={this.state.queryId}
            linkId={this.state.linkId}
            payoff={this.state.payoffs[0]}
            disabled={this.state.isLinkOwner || this.state.isQueryOwner}
          />
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
          <LinkButton
            queryId={this.state.queryId}
            parentLink={this.state.linkId}
            disabled={this.state.isLinkOwner || this.state.isQueryOwner}
            label={`Promote: ${formatCurrency(
              this.state.potentialPayoffs[this.state.generation + 1]
            )}`}
          />
        )}
      </div>
    );
  }
}

export default Profile;
