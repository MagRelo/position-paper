import React from 'react';

import { formatCurrency } from 'components/util/random';

function linkDisplay(props) {
  return (
    <ul className="progressbar">
      {props.payoffs &&
        props.payoffs.map((item, index) => {
          const width = 100 / props.payoffs.length;

          const isActive = props.generation === index;
          const isLastItem = index === props.payoffs.length - 1;
          const borderStyle = isLastItem && !isActive ? 'dotted' : null;

          const circleStyle = {
            borderColor: isActive ? '#55b776' : null,
            borderStyle: borderStyle
          };

          return (
            <li
              className={isActive ? 'active' : null}
              key={index}
              style={{ width: width + '%' }}
            >
              <span className="before" style={circleStyle}>
                {index}
              </span>
              <span>{index === 0 ? 'Origin' : formatCurrency(item)}</span>
              {index === 0 ? null : <span className="after" />}
            </li>
          );
        })}
    </ul>
  );
}

export default linkDisplay;
