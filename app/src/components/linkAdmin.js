import React, { Component } from 'react';

import LinksList from 'components/queryLinksTable';
import LinkGraph from 'components/queryLinkGraph';
import ResponseList from 'components/queryResponseTable';
import UserSocial from 'components/userSocial';

class LinkAdmin extends Component {
  state = { contactOpen: false, linkOpen: false, name: '' };

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
        <div>
          <h2>LinkAdmin</h2>
          <p>
            This is your link. If it is claimed the candidate will recieve{' '}
            <b>{this.formatCurrency(this.props.payoff)}</b>
            {this.props.userPayoff > 0 ? (
              <span>
                {' '}
                and you will recieve{' '}
                <b>{this.formatCurrency(this.props.userPayoff)}</b>.
              </span>
            ) : null}
          </p>
        </div>

        <div>
          <h3 className="section-header">Share Link on Social</h3>
          <UserSocial />
        </div>

        <div className="row row-2">
          <div>
            <h3 className="section-header">Link Activity</h3>
            <table className="pure-table">
              <thead>
                <tr>
                  <th>Referrer</th>
                  <th>Views</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>facebook.com</td>
                  <td>23</td>
                </tr>
                <tr>
                  <td>(direct)</td>
                  <td>12</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default LinkAdmin;
