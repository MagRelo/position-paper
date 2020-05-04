import React, { useState, useEffect } from 'react';
import Img from 'react-image';
import { MdLocationOn } from 'react-icons/md';
import { AiOutlineUser, AiFillDollarCircle } from 'react-icons/ai';

import { getBalance } from 'magic';

import { Bouncing } from 'components/random';

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
                      <MdLocationOn />
                    </span>{' '}
                    {user.publicAddress.substring(0, 8) + '...'}
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

export function Balance({ publicAddress }) {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setLoading(true);

    getBalance(publicAddress).then((balance) => {
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
        <span>{balance}</span>
      )}
    </React.Fragment>
  );
}
