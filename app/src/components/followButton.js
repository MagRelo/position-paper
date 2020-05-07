import React, { useState, useContext } from 'react';

import { AuthContext } from 'App';

// get user & follow list from context
// compare incoming Id with list

function FollowButton({ followUser }) {
  const { user } = useContext(AuthContext);

  // hide if not logged in || followUser is logged in user
  const hide = !user || !followUser._id || followUser._id === user._id;

  // is/isnt following
  const initialFollow = user.follows && !!~user.follows.indexOf(followUser._id);
  const [newVar, setNewVar] = useState(initialFollow);

  // console.log(initialFollow, newVar);

  // change follow status
  const [isLoading, setIsLoading] = useState(false);
  function handleClick() {
    setIsLoading(true);

    changeFollow('User', followUser._id, !newVar).then((followStatus) => {
      setNewVar(followStatus);
      setIsLoading(false);
    });
  }

  return (
    <React.Fragment>
      {hide ? null : (
        <button
          onClick={handleClick}
          className="btn btn-sm btn-unstyled"
          style={{ float: 'right' }}
        >
          {isLoading ? (
            <div className="spinner">
              <div />
            </div>
          ) : (
            <React.Fragment>
              {newVar ? <span>Unfollow</span> : <span>Follow</span>}
            </React.Fragment>
          )}
        </button>
      )}
    </React.Fragment>
  );
}

export default FollowButton;

async function changeFollow(type, targetId, intentToFollow) {
  const queryString = `?type=${type}&target=${targetId}&intent=${intentToFollow}`;
  return await fetch('/api/user/follow' + queryString, {
    method: 'PUT',
  })
    .then((r) => {
      return r.status === 200 ? intentToFollow : !intentToFollow;
    })
    .catch((error) => {
      console.error(error);
      return !intentToFollow;
    });
}
