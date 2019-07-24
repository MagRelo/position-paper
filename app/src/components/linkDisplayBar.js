import React from 'react';

import { formatCurrency } from 'components/util/random';

function linkDisplay(props) {
  return (
    <ul className="progressbar">
      {props.payoffs &&
        props.payoffs.map((item, index) => {
          const width = 100 / props.payoffs.length;

          const isFirstItem = index === 0;
          const isCurrentLink = index === props.generation;
          const isNextLink = index === props.generation + 1;

          const circleBorderStyle = isNextLink ? 'dashed' : null;
          const circleStyle = {
            borderColor: isCurrentLink ? '#55b776' : null,
            borderStyle: circleBorderStyle
          };

          const lineStyle = {
            background: isNextLink ? 'inherit' : null,
            borderTop: isNextLink ? '2px dashed #bdbdbd' : 'none'
          };

          return (
            <li
              className={isCurrentLink ? 'active' : null}
              key={index}
              style={{ width: width + '%' }}
            >
              {/* Circle */}
              <span className="before" style={circleStyle}>
                {index}
              </span>

              {/* Label */}
              <span>{isFirstItem ? 'Origin' : formatCurrency(item)}</span>

              {/* line to previous dot */}
              {isFirstItem ? null : (
                <span className="after" style={lineStyle} />
              )}
            </li>
          );
        })}
    </ul>
  );
}

export default linkDisplay;
