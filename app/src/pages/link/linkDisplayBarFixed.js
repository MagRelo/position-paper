import React from 'react';

import {
  IoMdBusiness,
  IoIosPerson,
  IoIosLink,
  IoIosPeople
} from 'react-icons/io';

import { formatCurrency } from 'components/util/random';

const iconStyle = {
  color: '#6c6d6f',
  height: '1.8em',
  width: '1.8em',
  marginTop: '4px'
};

function linkDisplay(props) {
  const count = props.showChild ? 4 : 3;
  const width = 100 / count;

  return (
    <ul className="progressbar">
      {/* Job Ad */}
      <li style={{ width: width + '%' }}>
        {/* Circle */}
        <span className="before">
          <IoMdBusiness style={iconStyle} />
        </span>

        {/* Label */}
        <span>{props.employer || 'Daily Beast'}</span>
      </li>

      {/* viewer */}
      <li style={{ width: width + '%' }}>
        {/* Circle */}
        <span
          className="before"
          style={{
            borderColor: '#55b776'
          }}
        >
          <IoIosLink style={{ ...iconStyle, color: '#55b776' }} />
        </span>

        {/* Label */}
        <span style={{ fontWeight: 'bolder', color: '#55b776' }}>
          {formatCurrency(props.viewerPayout || 0)}
        </span>

        {/* line to previous dot */}
        <span
          className="after"
          style={{
            borderTop: '2px solid #bdbdbd'
          }}
        />
      </li>

      {props.showChild ? (
        <li style={{ width: width + '%' }}>
          {/* Circle */}
          <span className="before" style={{ borderStyle: 'dashed' }}>
            <IoIosPeople style={iconStyle} />
          </span>

          {/* Label */}
          <span>{formatCurrency(props.childPayout || 0)}</span>

          {/* line to previous dot */}
          <span
            className="after"
            style={{
              borderTop: '2px dashed #bdbdbd'
            }}
          />
        </li>
      ) : null}

      {/* Cadidate */}
      <li style={{ width: width + '%' }}>
        {/* Circle */}
        <span className="before">
          <IoIosPerson style={iconStyle} />
        </span>

        {/* Label */}
        <span>Candidate</span>

        {/* line to previous dot */}
        <span
          className="after"
          style={{
            borderTop: '2px dashed #bdbdbd'
          }}
        />
      </li>
    </ul>
  );
}

export default linkDisplay;
