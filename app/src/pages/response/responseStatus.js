import React from 'react';

// import { formatCurrency } from 'components/random';

const steps = [
  { status: 'open', label: 'Response Sent', complete: true },
  { status: 'closed', label: 'Employer Confirm & Pay', complete: true },
  { status: 'closed', label: 'Network Paid', complete: true }
];

function stageDisplay(index, responseStatus) {
  // is current status later than this step?
  return index <= steps.map(step => step.status).indexOf(responseStatus);
}

function ResponseStatus(props) {
  return (
    <ul className="progressbar">
      {steps.map((item, index) => {
        // width
        const width = 100 / steps.length;

        // display settings
        const isFirstItem = index === 0;
        // const isCurrentLink = index === props.generation;
        // const isNextLink = index === props.generation + 1;

        const stageComplete = stageDisplay(index, props.status);

        // styles
        const circleStyle = {
          borderColor: stageComplete ? '#55b776' : null,
          borderStyle: stageComplete ? null : 'dashed'
        };
        const lineStyle = {
          // background: isNextLink ? 'inherit' : null,
          borderTop: stageComplete ? '2px solid #bdbdbd' : '2px dashed #bdbdbd'
        };

        return (
          <li
            className={stageComplete ? 'active' : null}
            key={index}
            style={{ width: width + '%' }}
          >
            {/* Circle */}
            <span className="circle" style={circleStyle}>
              {index + 1}
            </span>

            {/* Label */}
            <span>{item.label}</span>

            {/* line to previous dot */}
            {isFirstItem ? null : <span className="line" style={lineStyle} />}
          </li>
        );
      })}
    </ul>
  );
}

export default ResponseStatus;
