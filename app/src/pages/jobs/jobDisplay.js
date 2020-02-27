import React, { useState, useRef, useEffect } from 'react';
import { formatCurrency } from 'components/random';
// import { Link } from '@reach/router';
import { useRect } from '@reach/rect';

import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

// JOB DATA
function jobDataItem(label, value) {
  return (
    <React.Fragment>
      <div className="grid-label">{label}</div>
      <div style={{ color: 'black' }}>{value}</div>
    </React.Fragment>
  );
}

function createMarkup(markup) {
  return { __html: markup };
}

function salaryString(min, max) {
  return `${formatCurrency(min, true)} – ${formatCurrency(max, true)}`;
}

export function JobDisplay({ data }) {
  const [menuClosed, setMenuClosed] = useState(false);

  // get job description container width
  const jobDescRef = useRef();
  const jobDescRect = useRect(jobDescRef);
  const width = jobDescRect ? jobDescRect.width : 0;
  const height = jobDescRect ? jobDescRect.height : 0;

  // sync menu with container width
  useEffect(() => {
    // console.log(width, height);

    if (width < 400 && height > 400) {
      setMenuClosed(true);
    } else {
      setMenuClosed(false);
    }
  }, [width]);

  const mobileContainerStyle = {
    overflow: 'hidden',
    maxHeight: '360px'
  };

  const mobileButtonStyle = {
    position: 'relative'
  };

  return (
    <div className="job-data-panel">
      <h1>{data.jobTitle}</h1>

      {/* Job Details */}
      <div className="grid-left">
        {jobDataItem('Employer', data.employer)}
        {jobDataItem('Location', data.location)}
        {jobDataItem('Salary', salaryString(data.salaryMin, data.salaryMax))}
      </div>

      {/* Description */}
      <div
        className="job-description-container"
        ref={jobDescRef}
        style={menuClosed ? mobileContainerStyle : null}
      >
        <div
          className="job-description"
          dangerouslySetInnerHTML={createMarkup(data.renderedHtml)}
        />
        <div className="see-more" style={menuClosed ? null : mobileButtonStyle}>
          {/* Fade */}
          {menuClosed ? <div className="fade-white"></div> : null}

          {/* Button */}
          <div style={{ background: 'white', padding: '30px 0' }}>
            <button
              className="btn btn-sm btn-theme"
              onClick={() => {
                setMenuClosed(!menuClosed);
              }}
            >
              {menuClosed ? (
                <span>
                  <FaAngleDown /> See More
                </span>
              ) : (
                <span>
                  <FaAngleUp /> See Less
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// JOB DATA
