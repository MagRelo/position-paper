import React, { useState, useEffect } from 'react';

import { lineItem, formatCurrency } from 'components/util/random';

import LinkAdmin from 'components/linkAdmin';
import LinkButton from 'components/linkButton';
import ResponseButton from 'components/responseButton';

function Link(props) {
  const [link, setLink] = useState({});
  const [query, setQuery] = useState({});
  const [traffic, setTraffic] = useState({});
  const [links, setLinks] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    getLink(props.match.params.linkId).then(body => {
      setLink(body);
      setQuery(body.query);
      setTraffic(body.traffic);
      setLinks(body.links);
      setResponses(body.responses);
    });
  }, props.match.params.linkId);

  // JOB DATA
  const labelStyle = {
    textTransform: 'uppercase',
    fontSize: 'smaller',
    marginTop: '2px',
    textAlign: 'right'
  };
  function JobData(props) {
    return (
      <div style={{ padding: '0 1.5em 1em', border: 'solid 1px gray' }}>
        <h2>{props.data.title}</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gridGap: '1em'
          }}
        >
          {jobDataItem('Employer', props.data.employer)}
          {jobDataItem('Location', props.data.location)}
          {jobDataItem('Salary', props.data.salary)}
          {jobDataItem('Location', props.data.location)}

          {/* Link */}
          <React.Fragment>
            <div style={labelStyle}>Link</div>
            <div>
              <a href={props.data.url}>Stack Overflow</a>
            </div>
          </React.Fragment>
        </div>
      </div>
    );
  }
  function jobDataItem(label, value) {
    return (
      <React.Fragment>
        <div style={Object.assign(labelStyle, { textAlign: 'right' })}>
          {label}
        </div>
        <div>{value}</div>
      </React.Fragment>
    );
  }
  // JOB DATA

  return (
    <div>
      <div className="row row-5-3">
        <div className="">
          {query.data ? <JobData data={query.data} /> : null}
        </div>
        <div>
          <h3 className="section-header">Query Information</h3>

          {lineItem('Posted By', link.postedBy)}
          {lineItem('Candidate Bonus', formatCurrency(link.respondBonus))}
          {lineItem('Network Bonus', formatCurrency(link.networkBonus))}

          <ResponseButton
            queryId={query._id}
            linkId={link.linkId}
            payoff={link.respondBonus}
            disabled={link.isLinkOwner || link.isQueryOwner}
          />
          <LinkButton
            queryId={query._id}
            parentLink={link.linkId}
            disabled={link.isLinkOwner || link.isQueryOwner}
            label={'Promote:' + formatCurrency(link.promoteBonus)}
          />
        </div>
      </div>

      {link.isLinkOwner ? (
        <LinkAdmin
          query={query}
          link={link}
          traffic={traffic}
          childLinks={links}
          responses={responses}
          stream={[]}
        />
      ) : null}
    </div>
  );
}

export default Link;

async function getLink(linkId) {
  return await fetch('/api/link/' + linkId).then(response => response.json());
}

//{
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
//}

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
