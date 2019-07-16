import React from 'react';
import { Tabs, TabList, TabPanels, TabPanel } from '@reach/tabs';

import { formatCurrency, CoolTab } from 'components/util/random';

import LinkButton from 'components/linkButton';
import LinksList from 'components/queryLinksTable';
import LinkGraph from 'components/queryLinkGraph';
import ResponseList from 'components/queryResponseTable';
import UserSocial from 'components/userSocial';

function lineItem(label, value) {
  return (
    <div className="line-item">
      <div>{label}</div>
      <div className="line-item-filler" />
      <div>{value}</div>
    </div>
  );
}

function LinkAdmin(props) {
  return (
    <div>
      <div className="row row-2">
        <div>
          <h3 className="section-header">Link Information</h3>
          {lineItem('Link ID', props.link.linkId)}
          {lineItem('Candidate Bonus', formatCurrency(props.link.respondBonus))}
          {lineItem('Link Generation', props.link.generation)}
          {lineItem('Link Bonus', formatCurrency(props.link.promoteBonus))}
        </div>

        <div>
          <h3 className="section-header">Traffic</h3>

          <Tabs>
            <TabList style={{ marginBottom: '0.5em' }}>
              <CoolTab>Views</CoolTab>
              <CoolTab>Links</CoolTab>
              <CoolTab>Map</CoolTab>
            </TabList>

            <TabPanels>
              <TabPanel style={{ outline: 'none' }}>
                <div>Views: {props.traffic.views}</div>
              </TabPanel>

              <TabPanel style={{ outline: 'none' }}>
                <div>Links : {props.childLinks.length}</div>
              </TabPanel>

              <TabPanel style={{ outline: 'none' }}>[map]</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>

      <div className="row row-5-3">
        <div>
          <h3 className="section-header">Child Links</h3>

          <Tabs>
            <TabList style={{ marginBottom: '0.5em' }}>
              <CoolTab>Add Links</CoolTab>
              <CoolTab>Active Links</CoolTab>
              <CoolTab>Link Graph</CoolTab>
            </TabList>

            <TabPanels>
              <TabPanel style={{ outline: 'none' }}>
                <h4 className="section-header">Create Link URL</h4>
                <LinkButton label={'Create Link'} />
                <h4 className="section-header">Create and Share</h4>
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
          <h3 className="section-header">Responses</h3>
          <ResponseList responses={props.responses} />
        </div>
      </div>
    </div>
  );
}

export default LinkAdmin;
