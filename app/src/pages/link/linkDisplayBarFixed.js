import React from 'react';

import {
  IoMdBusiness,
  IoIosPerson,
  IoIosLink,
  IoIosPeople
} from 'react-icons/io';

import { formatCurrency } from 'components/random';

const iconStyle = {
  color: '#6c6d6f',
  height: '1.8em',
  width: '1.8em',
  marginTop: '4px'
};

function linkDisplay(props) {
  // count of tiles for spacing
  let count = 2;
  if (props.showChild) {
    count++;
  }
  if (props.showLink) {
    count++;
  }
  const width = 100 / count;

  return (
    <ul className="progressbar">
      {/* Employer */}
      <li style={{ width: width + '%' }}>
        <span className="circle">
          <IoMdBusiness style={iconStyle} />
        </span>
        <span>{props.employer || 'Your Company'}</span>
      </li>

      {/* Link */}
      {props.showLink ? (
        <li style={{ width: width + '%' }}>
          <span
            className="circle"
            style={{
              borderColor: '#55b776'
            }}
          >
            <IoIosLink style={{ ...iconStyle, color: '#55b776' }} />
          </span>

          <span style={{ fontWeight: 'bolder', color: '#55b776' }}>
            {formatCurrency(props.linkPayout || 0)}
          </span>

          <span
            className="line"
            style={{
              borderTop: '2px solid #bdbdbd'
            }}
          />
        </li>
      ) : null}

      {/* Network */}
      {props.showChild ? (
        <li style={{ width: width + '%' }}>
          <span className="circle" style={{ borderStyle: 'dashed' }}>
            <IoIosPeople style={iconStyle} />
          </span>

          {/* Label */}
          <span style={{ display: 'block' }}>
            {props.childLabel || 'Employees, Friends, Family...'}
          </span>
          <span>{formatCurrency(props.childPayout || 0)}</span>

          <span
            className="line"
            style={{
              borderTop: '2px dashed #bdbdbd'
            }}
          />
        </li>
      ) : null}

      {/* Candidate */}
      <li style={{ width: width + '%' }}>
        <span className="circle" style={{ borderStyle: 'dashed' }}>
          <IoIosPerson style={iconStyle} />
        </span>
        <span style={{ display: 'block' }}>
          {props.candidateLabel || 'New Employee'}
        </span>
        <span>{formatCurrency(props.candidatePayout || 0)}</span>
        <span
          className="line"
          style={{
            borderTop: '2px dashed #bdbdbd'
          }}
        />
      </li>
    </ul>
  );
}

export default linkDisplay;
