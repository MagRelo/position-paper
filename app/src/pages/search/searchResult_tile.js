import React from 'react';
import { Link } from '@reach/router';

import { formatCurrency } from 'components/random';

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

function activityTile(link) {
  const salaryString = `${formatCurrency(
    link.data.salaryMin,
    true
  )} – ${formatCurrency(link.data.salaryMax, true)}`;

  return (
    <Link to={'/link/' + link.linkId}>
      <div className="search-tile">
        <span
          className="label"
          style={{ float: 'right', lineHeight: '36px', marginLeft: '2em' }}
        >
          {formatDate(link.createdAt)}
        </span>

        <p
          className="section-header"
          style={{ color: 'initial', fontSize: '18px', marginTop: 0 }}
        >
          {link.data.jobTitle}
        </p>

        <div className="grid-left">
          {jobDataItem('Employer', link.data.employer)}
          {jobDataItem('Location', link.data.location)}
          {jobDataItem('Salary', salaryString)}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            textAlign: 'center',
            borderTop: '1px solid #cbcbcb',
            margin: '1em 0 0',
            padding: '1em 0 0'
          }}
        >
          <div style={{ borderRight: '1px solid #cbcbcb' }}>
            <span className="label">Job Board</span>
            <div style={{ color: '#0ea51d' }}>
              {formatCurrency(link.network_bonus)}
            </div>
          </div>
          <div>
            <span className="label">Employee</span>
            <div style={{ color: '#0ea51d' }}>
              {formatCurrency(link.target_bonus)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default activityTile;
