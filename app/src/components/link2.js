import React, { useState, useEffect } from 'react';

import { formatCurrency } from 'components/util/random';

import UserSocial from 'components/userSocial';
import LinkAdmin from 'components/linkAdmin';
import LinkButton from 'components/linkButton';
import ResponseButton from 'components/responseButton';

function Link(props) {
  const [user, setUser] = useState({});
  const [link, setLink] = useState({});
  const [query, setQuery] = useState({});
  const [traffic, setTraffic] = useState({});
  // const [children, setChildren] = useState([]);
  const [responses, setResponses] = useState([]);
  const [stream, setStream] = useState([]);

  useEffect(() => {
    getLink(props.match.params.linkId).then(body => {
      setUser(body.user);
      setLink(body.link);
      setQuery(body.query);
      setTraffic(body.traffic);
      // setChildren(body.children);
      setResponses(body.responses);
      setStream(body.stream);
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
        <div
          style={Object.assign(labelStyle, {
            textAlign: 'right',
            color: 'gray'
          })}
        >
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
        {/* Job */}
        <div>{query.data ? <JobData data={query.data} /> : null}</div>

        {/* Responses */}
        <div>
          <div>
            <h4 className="section-header">Respond to this Query</h4>
            <ResponseButton
              queryId={query._id}
              linkId={link.linkId}
              payoff={query.target_bonus}
              disabled={user.isLinkOwner || user.isQueryOwner}
            />
          </div>

          <div>
            <h4 className="section-header">Promote this Query</h4>
            <LinkButton
              queryId={query._id}
              parentLink={link.linkId}
              disabled={user.isLinkOwner || user.isQueryOwner}
              label={
                'Promote: ' +
                formatCurrency(
                  link.potentialPayoffs &&
                    link.potentialPayoffs[link.generation + 1]
                )
              }
            />
          </div>

          <div>
            <h4 className="section-header">Share Link</h4>
            <UserSocial />
          </div>
        </div>
      </div>

      {user.isLinkOwner ? (
        <LinkAdmin
          userId={user._id}
          query={query}
          link={link}
          traffic={traffic}
          childLinks={query.links}
          responses={responses}
          stream={stream}
        />
      ) : null}
    </div>
  );
}

export default Link;

async function getLink(linkId) {
  return await fetch('/api/link/' + linkId).then(response => response.json());
}
