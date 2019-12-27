import React from 'react';
import { formatCurrency } from '../components/util/random';
import { Link } from '@reach/router';
import FollowButton from 'components/followButton';

// const panelStyle = {
//   padding: '1px 2em 2em'
//   // boxShadow: '0px 2px 5px 0px rgba(117, 117, 117, 0.58)'
// };

// const labelStyle = {
//   textTransform: 'uppercase',
//   fontSize: 'smaller',
//   marginTop: '2px',
//   marginLeft: '1em',
//   textAlign: 'right',
//   color: 'gray'
// };

// const gridStyle = {
//   display: 'grid',
//   gridTemplateColumns: 'auto 1fr',
//   gridGap: '1em'
// };

// JOB DATA
function jobDataItem(label, value) {
  return (
    <React.Fragment>
      <div className="job-data-label">{label}</div>
      <div>{value}</div>
    </React.Fragment>
  );
}

export function LinkDisplay({ data }) {
  const salaryString = `${formatCurrency(
    data.salaryMin,
    true
  )} – ${formatCurrency(data.salaryMax, true)}`;

  return (
    <div className="job-data-panel">
      <h2 className="section-header">{data.title}</h2>
      <div className="job-data-grid">
        {jobDataItem('Employer', data.employer)}
        {jobDataItem('Location', data.location)}
        {jobDataItem('Salary', salaryString)}
        {jobDataItem('', data.description)}
      </div>
      <hr />
      <div>
        <h4 className="section-header">Apply for this Job</h4>
        <p>
          Apply for this position. This position comes with a{' '}
          {formatCurrency('xxx')} signing bonus.
        </p>

        {/* <Link
          className="btn btn-theme btn-sm"
          disabled={data.user._id === 0 || data.user.isLinkOwner}
          to={'/respond/' + data.link.linkId}
        >
          {'Apply @ ' + formatCurrency(data.link.target_bonus)}
        </Link> */}

        <button className="btn btn-theme btn-sm">Apply Now (dummy)</button>
      </div>
      <hr />
      <div className="link-display-item">
        <h4 className="section-header">Follow this Deal</h4>
        <p>Follow to receive updates in your activity feed.</p>

        {/* <FollowButton
          type="Link"
          targetId={props.link._id}
          isFollowing={props.user.isFollowingLink}
          disabled={props.user._id === 0 || props.user.isLinkOwner}
        /> */}
        <button className="btn btn-theme btn-sm">Follow Job (dummy)</button>
        {/* 
        <FollowButton
          type="User"
          targetId={props.link.userId}
          isFollowing={props.user.isFollowingUser}
          disabled={props.user._id === 0 || props.user.isLinkOwner}
        /> */}

        <button className="btn btn-theme btn-sm">Follow User (dummy)</button>
      </div>
    </div>
  );
}
// JOB DATA
