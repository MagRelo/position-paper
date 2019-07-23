import React, { useState, useEffect } from 'react';

import { formatCurrency } from 'components/util/random';

import UserSocial from 'components/userSocial';
import LinkAdmin from 'components/linkAdmin';
import LinkButton from 'components/linkButton';
import ResponseButton from 'components/responseButton';

function Link(props) {
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState({});
  const [link, setLink] = useState({});
  const [query, setQuery] = useState({});
  const [traffic, setTraffic] = useState({});
  const [responses, setResponses] = useState([]);
  const [stream, setStream] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    getLink(props.match.params.linkId).then(body => {
      setUser(body.user);
      setLink(body.link);
      setQuery(body.query);
      setTraffic(body.traffic);
      setResponses(body.responses);
      setStream(body.stream);

      setIsLoading(false);
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
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <div className="spinner">
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div className="row row-5-3">
            {/* Job */}
            <div>{query.data ? <JobData data={query.data} /> : null}</div>

            <div>
              <h4 className="section-header">Share Link</h4>
              <UserSocial />
            </div>
          </div>

          {user.isLinkOwner ? (
            <LinkAdmin
              userId={user._id}
              query={query}
              link={link}
              traffic={traffic}
              childLinks={link.children}
              responses={responses}
              stream={stream}
            />
          ) : (
            <div className="row row-2">
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
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default Link;

async function getLink(linkId) {
  return await fetch('/api/link/' + linkId).then(response => response.json());
}
