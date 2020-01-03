import React from 'react';
import { Link } from '@reach/router';

import { formatCurrency } from 'components/random';

import { useTrail, animated } from 'react-spring';

// Load locale-specific relative date/time formatting rules.
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en);

// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US');
const offset = new Date().getTimezoneOffset();
const offsetMs = offset * 60000;

function formatDate(utcTimeStamp) {
  const date = new Date(utcTimeStamp);
  const offsetDate = date.getTime() - offsetMs;
  return timeAgo.format(offsetDate, 'twitter');
}

// JOB DATA
function jobDataItem(label, value) {
  return (
    <React.Fragment>
      <div className="grid-label">{label}</div>
      <div>{value}</div>
    </React.Fragment>
  );
}

function activityTile({ link, query, user }) {
  const salaryString = `${formatCurrency(
    query.data.salaryMin,
    true
  )} – ${formatCurrency(query.data.salaryMax, true)}`;

  return (
    <div className="search-tile">
      <span
        className="label"
        style={{ float: 'right', lineHeight: '36px', marginLeft: '2em' }}
      >
        {formatDate(link.createdAt)}
      </span>

      <div>
        <p
          className="section-header"
          style={{ color: 'initial', fontSize: '18px', marginTop: 0 }}
        >
          {query.data.jobTitle}
        </p>

        <div className="grid-left">
          {jobDataItem('Employer', query.data.employer)}
          {jobDataItem('Location', query.data.location)}
          {jobDataItem('Salary', salaryString)}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          textAlign: 'center',
          borderTop: '1px solid #cbcbcb',
          borderBottom: '1px solid #cbcbcb',
          margin: '1em 0',
          padding: '0.5em 0'
        }}
      >
        <div style={{ borderRight: '1px solid #cbcbcb' }}>
          <span className="label">Network</span>
          <div style={{ color: '#0ea51d' }}>
            {formatCurrency(link.promoteBonus)}
          </div>
        </div>
        <div>
          <span className="label">Employee</span>
          <div style={{ color: '#0ea51d' }}>
            {formatCurrency(link.respondBonus)}
          </div>
        </div>
      </div>

      <Link
        className="btn btn-theme btn-sm"
        style={{ color: 'white', width: '100%' }}
        to={'/link/' + link.linkId}
      >
        View
      </Link>
    </div>
  );
}

function AnimatedSearchResults(props) {
  const config = { mass: 5, tension: 2000, friction: 200 };
  const trail = useTrail(props.results.length, {
    config,
    opacity: 1,
    x: 0,
    height: 80,
    from: { opacity: 0, x: 20, height: 0 }
  });

  return (
    <div className="row">
      {trail.map(({ x, height, ...rest }, index) => {
        return (
          <animated.div
            key={index}
            className="col-lg-4"
            style={{
              ...rest,
              transform: x.interpolate(x => `translate3d(0,${x}px,0)`)
            }}
          >
            {activityTile(props.results[index])}
          </animated.div>
        );
      })}
    </div>
  );
}

export default AnimatedSearchResults;
