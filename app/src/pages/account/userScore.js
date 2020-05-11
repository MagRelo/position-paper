import React, { useContext } from 'react';
import { AuthContext } from 'App';

import Img from 'react-image';
import { AiOutlineUser } from 'react-icons/ai';

import { Link } from '@reach/router';

export function UserScore({ displayUser }) {
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
        <Link to={linkUrl}>
          <div className="user-score">
            <div>
              <ProfilePic avatarUrl={displayUser.avatar} />
            </div>

            <div className="user-text">
              <div className="user-name">{displayUser.displayName}</div>
            </div>

            <div className="user-text">
              <div className="title-theme-bg">{displayUser.units}</div>
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
