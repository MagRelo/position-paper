import React, { useContext } from 'react';
import Img from 'react-image';
import { Link } from '@reach/router';
import { AiOutlineUser } from 'react-icons/ai';
// import { MdEmail } from 'react-icons/md';
// import { IoIosWallet } from 'react-icons/io';

import { AuthContext } from 'App';

import FollowButton from 'components/followButton';
// import { Bouncing } from 'components/random';

export function UserProfile({
  displayUser,
  showEdit,
  showFollow,
  showLogout,
  disableLink,
}) {
  const { user, logout } = useContext(AuthContext);

  const isMe = user && user._id === displayUser._id;

  // link to user page OR user's account page
  let linkUrl = isMe ? '/account' : '/user/' + displayUser._id;
  const linkStyle = disableLink ? { pointerEvents: 'none' } : null;

  return (
    <React.Fragment>
      {user ? (
        <div className="user-profile">
          {showEdit && isMe ? (
            <Link
              className="btn btn-sm btn-unstyled"
              style={{ float: 'right' }}
              to="/profile"
            >
              Update Profile
            </Link>
          ) : null}

          {showLogout ? (
            <button
              type="button"
              className="btn btn-sm btn-unstyled"
              style={{ float: 'right' }}
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          ) : null}

          {showFollow ? <FollowButton followUser={displayUser} /> : null}

          <Link to={linkUrl} style={linkStyle}>
            <div className="user-info">
              <div>
                <ProfilePic avatarUrl={displayUser.avatar} />
              </div>

              <div className="user-text">
                <div className="user-name">{displayUser.displayName}</div>
                <div className="user-caption">{displayUser.caption}</div>

                {displayUser.units ? (
                  <div>
                    <div className="mb-1"></div>
                    <div className="user-caption">
                      <span className="highlight">{displayUser.units}</span>
                    </div>
                  </div>
                ) : null}
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
