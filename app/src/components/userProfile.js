import React, { useState, useEffect } from 'react';
import Img from 'react-image';
import { MdEmail } from 'react-icons/md';
import { AiOutlineUser, AiFillDollarCircle } from 'react-icons/ai';
import { IoIosWallet } from 'react-icons/io';

import { getBalance } from 'api/magic';

import { Bouncing, copyTextToClipboard } from 'components/random';

export function UserProfile({ user, hideDescription }) {
  const [hideDesc] = useState(hideDescription || false);

  return (
    <React.Fragment>
      {user ? (
        <div className="user-profile panel">
          <div className="user-info">
            <div>
              <ProfilePic avatarUrl={user.avatar} />
            </div>

            <div className="user-text">
              <div className="user-name">{user.displayName}</div>

              {hideDesc ? null : (
                <React.Fragment>
                  <div>
                    <span className="icon-wrapper blue">
                      <AiFillDollarCircle />
                    </span>{' '}
                    <Balance publicAddress={user.publicAddress} />
                  </div>
                  <div>
                    <span className="icon-wrapper blue">
                      <MdEmail />
                    </span>{' '}
                    {user.email}
                  </div>
                  <div>
                    <span className="icon-wrapper blue">
                      <IoIosWallet />
                    </span>{' '}
                    {user.publicAddress.substring(0, 8) + '...'}
                    <button
                      className="btn btn-sm btn-unstyled"
                      onClick={() => {
                        copyTextToClipboard(user.publicAddress);
                      }}
                    >
                      copy
                    </button>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
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

export function Balance({ publicAddress }) {
  const [loading, setLoading] = useState(false);
  const [network, setNetwork] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setLoading(true);
    getBalance(publicAddress).then(({ network, balance }) => {
      setNetwork(network.name);
      setBalance(balance);
      setLoading(false);
    });
  }, [publicAddress]);

  return (
    <React.Fragment>
      {loading ? (
        <span>
          <Bouncing />
        </span>
      ) : (
        <span>
          {balance}Ξ ({network})
        </span>
      )}
    </React.Fragment>
  );
}
