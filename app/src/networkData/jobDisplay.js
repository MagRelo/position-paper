import React from 'react';
import { formatCurrency } from '../components/util/random';
// import { Link } from '@reach/router';
// import FollowButton from 'components/followButton';

// JOB DATA
function jobDataItem(label, value) {
  return (
    <React.Fragment>
      <div className="grid-label">{label}</div>
      <div style={{ color: 'black' }}>{value}</div>
    </React.Fragment>
  );
}

export function JobDisplay({ data }) {
  const salaryString = `${formatCurrency(
    data.salaryMin,
    true
  )} – ${formatCurrency(data.salaryMax, true)}`;

  return (
    <div className="job-data-panel">
      <h1 className="section-header">{data.jobTitle}</h1>
      <div className="grid-left">
        {jobDataItem('Employer', data.employer)}
        {jobDataItem('Location', data.location)}
        {jobDataItem('Salary', salaryString)}
        {jobDataItem('', data.description)}
      </div>
    </div>
  );
}
// JOB DATA
