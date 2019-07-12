import React, { Component } from 'react';
import { Tabs, TabList, TabPanels, TabPanel } from '@reach/tabs';

import LinksList from 'components/queryLinksTable';
import LinkGraph from 'components/queryLinkGraph';
import ResponseList from 'components/queryResponseTable';

import UserSocial from 'components/userSocial';
import { CoolTab } from 'components/util/random';

class Query extends Component {
  state = { contactOpen: false, linkOpen: false, links: [], responses: [] };

  formatCurrency(input) {
    if (typeof input === 'number') {
      return input.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      });
    }
    return '';
  }

  async componentDidMount() {
    // get linkId from URL
    const linkId = this.props.match.params.linkId;

    // get position data
    const response = await fetch('/api/query/' + linkId);
    if (response.status === 200) {
      const query = await response.json();

      // console.log(query);

      this.setState({
        title: query.title,
        bonus: query.bonus,
        description: query.data.description,
        links: query.links,
        responses: query.responses
      });
    } else {
      console.log('not found', response.status);
    }
  }

  render() {
    return (
      <div>
        <div className="row row-5-3">
          <div className="panel">
            <h2>{this.state.title}</h2>
            <p>Bonus: {this.formatCurrency(this.state.bonus)}</p>
            <p>Description: {this.state.description}</p>
          </div>
          <UserSocial />
        </div>

        <section>
          <Tabs style={{ marginTop: '0.5em' }}>
            <TabList style={{ marginBottom: '0.5em' }}>
              <CoolTab>Analytics</CoolTab>
              <CoolTab>Links</CoolTab>
              <CoolTab>Responses</CoolTab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <div className="row row-5">
                  <div>Links</div>
                  <div>Views</div>
                  <div>Top Referrers</div>
                  <div>section</div>
                  <div>country map</div>
                </div>
              </TabPanel>
              <TabPanel style={{ outline: 'none' }}>
                <div className="row row-2">
                  <div>
                    <LinksList links={this.state.links} />
                  </div>
                  <div>
                    <LinkGraph links={this.state.links} />
                  </div>
                </div>
              </TabPanel>

              <TabPanel style={{ outline: 'none' }}>
                <div>
                  <ResponseList responses={this.state.responses} />
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </section>
      </div>
    );
  }
}

export default Query;
