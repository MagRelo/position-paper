import React from 'react';
import { formatCurrency } from '../components/util/random';

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

export function LinkDisplay(props) {
  return (
    <div className="query-data-panel">
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
        {jobDataItem(
          'Salary',
          `${formatCurrency(props.data.salaryMin, true)} – ${formatCurrency(
            props.data.salaryMax,
            true
          )}`
        )}
        {jobDataItem('', props.data.description)}
      </div>
    </div>
  );
}
// JOB DATA
