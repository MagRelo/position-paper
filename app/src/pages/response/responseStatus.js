import React from 'react';
import { formatDate } from 'components/random';

function stageDisplay(index, responseStatus, steps) {
  // is current status later than this step?
  return index <= steps.map(step => step.status).indexOf(responseStatus);
}

function ResponseStatus({ status, steps }) {
  console.log(status, steps);
  return (
    <ul className="progressbar">
      {steps.map((item, index) => {
        // width
        const width = 100 / steps.length;

        // display settings
        const isFirstItem = index === 0;
        // const isCurrentLink = index === props.generation;
        // const isNextLink = index === props.generation + 1;

        const stageComplete = stageDisplay(index, status, steps);

        // styles
        const circleStyle = {
          borderColor: stageComplete ? '#55b776' : null,
          borderStyle: stageComplete ? null : 'dashed'
        };
        const lineStyle = {
          // background: isNextLink ? 'inherit' : null,
          borderTop: stageComplete ? '2px solid #55b776' : '2px dashed #bdbdbd'
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
            <span>
              {item.label} <br></br> {item.date ? formatDate(item.date) : ''}
            </span>

            {/* line to previous dot */}
            {isFirstItem ? null : <span className="line" style={lineStyle} />}
          </li>
        );
      })}
    </ul>
  );
}

export default ResponseStatus;
