import React from 'react';
import { Tabs, TabList, TabPanels, TabPanel } from '@reach/tabs';

import { formatCurrency, lineItem, CoolTab } from 'components/util/random';

import LinkDisplay from 'components/linkDisplayBar';
import LinksList from 'components/queryLinksTable';
import LinkGraph from 'components/queryLinkGraph';
import ResponseList from 'components/queryResponseTable';
import UserSocial from 'components/userSocial';
import StreamList from 'components/userStream';

function LinkAdmin(props) {
  return (
    <div>
      <div className="row row-2">
        <div>
          <h3 className="section-header">Link Information</h3>
          <p>
            This link will pay{' '}
            {formatCurrency(
              props.link.payoffs && props.link.payoffs[props.link.generation]
            )}{' '}
            if the candidate responds through this link.
          </p>
          <div>
            <LinkDisplay
              payoffs={props.link.payoffs}
              generation={props.link.generation}
            />
          </div>
          <h4 className="section-header">Share Link</h4>
          <UserSocial />
        </div>

        <div>
          <h3 className="section-header">Link Traffic</h3>

          {lineItem('Last 24 hours', props.traffic.last1days)}
          {lineItem('Last 7 days', props.traffic.last7days)}
          {lineItem('Last 30 days', props.traffic.last30days)}
        </div>
      </div>

      <div className="row row-5-3">
        <div>
          <h3 className="section-header">Child Links</h3>

          <Tabs>
            <TabList style={{ marginBottom: '0.5em' }}>
              <CoolTab>Create a Link</CoolTab>
              <CoolTab>Child Links</CoolTab>
              <CoolTab>Link Graph</CoolTab>
            </TabList>

            <TabPanels>
              <TabPanel style={{ outline: 'none' }}>
                <div>
                  <p>
                    This link will pay{' '}
                    {formatCurrency(
                      props.link.potentialPayoffs &&
                        props.link.potentialPayoffs[props.link.generation]
                    )}{' '}
                    if the candidate responds a through a child of this link.
                  </p>
                  <LinkDisplay
                    payoffs={props.link.potentialPayoffs}
                    generation={props.link.generation}
                  />
                </div>
                <h4 className="section-header">Create Child and Share</h4>
                <UserSocial />
              </TabPanel>

              <TabPanel style={{ outline: 'none' }}>
                <LinksList links={props.childLinks} />
              </TabPanel>

              <TabPanel style={{ outline: 'none' }}>
                <LinkGraph links={props.childLinks} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
        <div>
          <h3 className="section-header">Activity & Responses</h3>

          <Tabs>
            <TabList style={{ marginBottom: '0.5em' }}>
              <CoolTab>Activity</CoolTab>
              <CoolTab>Responses</CoolTab>
            </TabList>

            <TabPanels>
              <TabPanel style={{ outline: 'none' }}>
                <StreamList stream={props.stream} userId={props.userId} />
              </TabPanel>

              <TabPanel style={{ outline: 'none' }}>
                <ResponseList responses={props.responses} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default LinkAdmin;
