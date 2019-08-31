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
        {jobDataItem('Salary', props.data.salary)}

        {/* Link */}
        <React.Fragment>
          <div style={labelStyle}>Link</div>
          <div>
            <a href={props.data.url}>Stack Overflow</a>
          </div>
        </React.Fragment>

        <React.Fragment>
          <div style={labelStyle}>Skills</div>
          <div>
            <ul style={{ padding: 0, margin: 0 }}>
              {props.data.skills.length &&
                props.data.skills.map(skill => {
                  return (
                    <li
                      key={skill}
                      style={{
                        display: 'inline',
                        marginRight: '1em',
                        padding: '0.15em 0.5em 0.3em',
                        border: 'solid 1px #ccc',
                        color: '#666',
                        borderRadius: '4px',
                        fontSize: 'smaller'
                      }}
                    >
                      {skill}
                    </li>
                  );
                })}
            </ul>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
}
// JOB DATA
