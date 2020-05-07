import React, { useState, useEffect } from 'react';
import Img from 'react-image';
import { AiOutlineUser } from 'react-icons/ai';

import { Link } from '@reach/router';

export function UserScore({ user }) {
  return (
    <React.Fragment>
      {user ? (
        <Link to={'/user/' + user._id}>
          <div>
            <div className="user-score">
              <div>
                <ProfilePic avatarUrl={user.avatar} />
              </div>

              <div className="user-text">
                <div className="user-name">{user.displayName}</div>
              </div>

              <div className="user-text">
                <div>2000</div>
              </div>
            </div>
          </div>
        </Link>
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

// export function Balance({ publicAddress }) {
//   const [loading, setLoading] = useState(false);
//   const [network, setNetwork] = useState('');
//   const [balance, setBalance] = useState(0);

//   useEffect(() => {
//     setLoading(true);
//     getBalance(publicAddress).then(({ network, balance }) => {
//       setNetwork(network.name);
//       setBalance(balance);
//       setLoading(false);
//     });
//   }, [publicAddress]);

//   return (
//     <React.Fragment>
//       {loading ? (
//         <span>
//           <Bouncing />
//         </span>
//       ) : (
//         <span>
//           {balance}Ξ ({network})
//         </span>
//       )}
//     </React.Fragment>
//   );
// }

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
