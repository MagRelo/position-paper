import React from 'react';

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
    <div>
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
// JOB DATA
