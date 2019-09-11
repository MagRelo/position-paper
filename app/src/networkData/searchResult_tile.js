import React from 'react';
import { Link } from '@reach/router';

import { formatCurrency } from 'components/util/random';

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

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gridGap: '1em'
};

const labelStyle = {
  textTransform: 'uppercase',
  fontSize: 'smaller',
  marginTop: '2px',
  marginLeft: '1em',
  textAlign: 'right',
  color: 'gray'
};

// JOB DATA
function jobDataItem(label, value) {
  return (
    <React.Fragment>
      <div style={labelStyle}>{label}</div>
      <div>{value}</div>
    </React.Fragment>
  );
}

function LinkDisplay({ data }) {
  const salaryString = `${formatCurrency(
    data.salaryMin,
    true
  )} – ${formatCurrency(data.salaryMax, true)}`;

  return (
    <div style={gridStyle}>
      {jobDataItem('Employer', data.employer)}
      {jobDataItem('Location', data.location)}
      {jobDataItem('Salary', salaryString)}
    </div>
  );
}

function activityTile({ link, query, user }) {
  // if (!item.data) return <div>error: no data</div>;

  return (
    <div className="search-tile">
      <div className="search-tile-header">
        <span className="label" style={{ float: 'right' }}>
          {formatDate(link.createdAt)}
        </span>
      </div>

      <div>
        <p className="section-header" style={{ color: 'initial' }}>
          {query.data.title}
        </p>
        {LinkDisplay(query)}
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
        className="pure-button pure-button-primary"
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
    <div className="row row-3">
      {trail.map(({ x, height, ...rest }, index) => {
        return (
          <animated.div
            key={index}
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
