import React from 'react';
import { formatCurrency } from '../components/util/random';

// const panelStyle = {
//   padding: '1px 2em 2em'
//   // boxShadow: '0px 2px 5px 0px rgba(117, 117, 117, 0.58)'
// };

// const labelStyle = {
//   textTransform: 'uppercase',
//   fontSize: 'smaller',
//   marginTop: '2px',
//   marginLeft: '1em',
//   textAlign: 'right',
//   color: 'gray'
// };

// const gridStyle = {
//   display: 'grid',
//   gridTemplateColumns: 'auto 1fr',
//   gridGap: '1em'
// };

// JOB DATA
function jobDataItem(label, value) {
  return (
    <React.Fragment>
      <div className="job-data-label">{label}</div>
      <div>{value}</div>
    </React.Fragment>
  );
}

export function LinkDisplay({ data }) {
  const salaryString = `${formatCurrency(
    data.salaryMin,
    true
  )} – ${formatCurrency(data.salaryMax, true)}`;

  return (
    <div className="job-data-panel">
      <div className="job-data-grid">
        {jobDataItem('Employer', data.employer)}
        {jobDataItem('Location', data.location)}
        {jobDataItem('Salary', salaryString)}
        {jobDataItem('', data.description)}
      </div>
    </div>
  );
}
// JOB DATA
