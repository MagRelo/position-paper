import React, { useState, useEffect } from 'react';
import { Tabs, TabList, TabPanels, TabPanel } from '@reach/tabs';

import { formatCurrency, CoolTab } from 'components/util/random';

import LinkAdmin from 'components/linkAdmin';

import LinkButton from 'components/linkButton';
import ResponseButton from 'components/responseButton';

// query info
// traffic, child links, responses

function Link(props) {
  const [link, setLink] = useState({});
  const [query, setQuery] = useState({});
  const [traffic, setTraffic] = useState({});
  const [links, setLinks] = useState([]);
  const [responses, setResponses] = useState([]);
  useEffect(() => {
    getLink(props.match.params.linkId).then(body => {
      console.log(body);

      setLink(body);
      setQuery(body.query);
      setTraffic(body.traffic);
      setLinks(body.links);
      setResponses(body.responses);
    });
  }, props.match.params.linkId);

  return (
    <div>
      <div className="panel">
        <h2>{link.title}</h2>
        <p>Description: {link.description}</p>

        <ResponseButton
          queryId={query._id}
          linkId={link.linkId}
          payoff={link.respondBonus}
          disabled={link.isLinkOwner || link.isQueryOwner}
        />
      </div>

      {link.isLinkOwner ? (
        <LinkAdmin />
      ) : (
        <LinkButton
          queryId={query._id}
          linkId={link.linkId}
          disabled={link.isLinkOwner || link.isQueryOwner}
          label={link.promoteBonus}
        />
      )}
    </div>
  );
}

export default Link;

async function getLink(linkId) {
  return await fetch('/api/link/' + linkId).then(response => response.json());
}

{
  /* <Tabs style={{ marginTop: '0.5em' }}>
<TabList style={{ marginBottom: '0.5em' }}>
  <CoolTab>Traffic</CoolTab>
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
        <LinksList links={links} />
      </div>
      <div>
        <LinkGraph links={links} />
      </div>
    </div>
  </TabPanel>

  <TabPanel style={{ outline: 'none' }}>
    <div>
      <ResponseList responses={responses} />
    </div>
  </TabPanel>
</TabPanels>
</Tabs> */
}

// class Link extends Component {
//   state = {
//     linkOpen: false,
//     name: '',
//     potentialPayoffs: [],
//     payoffs: []
//   };

//   async componentDidMount() {
//     // get linkId from URL
//     const linkId = this.props.match.params.linkId;

//     // get position data
//     const response = await fetch('/api/link/' + linkId);
//     if (response.status === 200) {
//       const responseObj = await response.json();

//       // console.log(responseObj);

//       this.setState({
//         linkId: linkId,
//         queryId: responseObj.query._id,
//         name: responseObj.query.title,
//         description: responseObj.query.description,
//         payoffs: responseObj.link.payoffs,
//         potentialPayoffs: responseObj.link.potentialPayoffs,
//         isQueryOwner: responseObj.link.isQueryOwner,
//         isLinkOwner: responseObj.link.isLinkOwner,
//         generation: responseObj.link.generation
//       });

//     } else {
//       console.log('not found', response.status);
//     }
//   }

//   render() {
//     return (
// <div>
//   <div className="panel">
//     <h2>{this.state.name}</h2>
//     <p>Description: {this.state.description}</p>
//     <ResponseButton
//       queryId={this.state.queryId}
//       linkId={this.state.linkId}
//       payoff={this.state.payoffs[0]}
//       disabled={this.state.isLinkOwner || this.state.isQueryOwner}
//     />
//   </div>

//   {this.state.isLinkOwner ? (
//     <LinkAdmin
//       payoff={this.state.payoffs[0]}
//       userPayoff={
//         this.state.generation
//           ? this.state.payoffs[this.state.generation]
//           : 0
//       }
//     />
//   ) : (
//     <LinkButton
//       queryId={this.state.queryId}
//       parentLink={this.state.linkId}
//       disabled={this.state.isLinkOwner || this.state.isQueryOwner}
//       label={`Promote: ${formatCurrency(
//         this.state.potentialPayoffs[this.state.generation + 1]
//       )}`}
//     />
//   )}
// </div>
//     );
//   }
// }
