import React, { useState, useEffect, useContext } from 'react';
import Img from 'react-image';
import { Link } from '@reach/router';
import { AiOutlineUser } from 'react-icons/ai';
// import { MdEmail } from 'react-icons/md';
// import { IoIosWallet } from 'react-icons/io';

import { AuthContext } from 'App';

import FollowButton from 'components/followButton';
import { Bouncing } from 'components/random';

export function UserProfile({ displayUser, showEdit, showFollow }) {
  // default
  let linkUrl = '/user/' + displayUser._id;

  // is me?
  const { user } = useContext(AuthContext);
  if (user && user._id === displayUser._id) {
    linkUrl = '/account';
  }

  return (
    <React.Fragment>
      {user ? (
        <div className="user-profile">
          {showEdit ? (
            <Link
              className="btn btn-sm btn-unstyled"
              style={{ float: 'right' }}
              to="/profile"
            >
              Update Profile
            </Link>
          ) : null}

          {showFollow ? <FollowButton followUser={displayUser} /> : null}

          <Link to={linkUrl}>
            <div className="user-info">
              <div>
                <ProfilePic avatarUrl={displayUser.avatar} />
              </div>

              <div className="user-text">
                <div className="user-name">{displayUser.displayName}</div>
                <div className="user-caption">{displayUser.caption}</div>
              </div>
            </div>
          </Link>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export function ProfilePic({ avatarUrl }) {
  const defaultPic = () => {
    return (
      <div className="user-avatar">
        <div className="user-avatar-pic" alt="avatar">
          <AiOutlineUser />
        </div>
      </div>
    );
  };

  return (
    <Img
      className="user-avatar"
      src={[avatarUrl]}
      loader={defaultPic()}
      unloader={defaultPic()}
    />
  );
}

// {hideDescription ? null : (
//   <React.Fragment>
//     <div className="mb-2"></div>
//     <div>
//       <span className="icon-wrapper blue">
//         <AiFillDollarCircle />
//       </span>{' '}
//       <Balance publicAddress={user.publicAddress} />
//     </div>

//     <div>
//       <span className="icon-wrapper blue">
//         <IoIosWallet />
//       </span>{' '}
//       {user.publicAddress.substring(0, 11) + '...'}{' '}
//       <button
//         className="btn btn-sm btn-unstyled"
//         onClick={() => {
//           copyTextToClipboard(user.publicAddress);
//         }}
//       >
//         copy
//       </button>
//     </div>
//     <div>
//       <span className="icon-wrapper blue">
//         <MdEmail />
//       </span>{' '}
//       {user.email}
//     </div>
//   </React.Fragment>
// )}
