import React, { useState } from 'react';

function FollowButton(props) {
  // is/isnt following
  const [isFollowing, setIsFollowing] = useState(props.isFollowing);

  // change follow status
  const [isLoading, setIsLoading] = useState(false);
  function handleClick() {
    setIsLoading(true);
    changeFollow(props.type, props.targetId, !isFollowing).then(
      followStatus => {
        setIsFollowing(followStatus);
        setIsLoading(false);
      }
    );
  }

  return (
    <React.Fragment>
      <button
        className="pure-button"
        onClick={handleClick}
        disabled={props.disabled}
      >
        {isLoading ? (
          <div className="spinner">
            <div />
          </div>
        ) : (
          <React.Fragment>
            {isFollowing ? (
              <span>Unfollow</span>
            ) : (
              <span>Follow {props.type}</span>
            )}
          </React.Fragment>
        )}
      </button>
    </React.Fragment>
  );
}

export default FollowButton;

async function changeFollow(type, targetId, intentToFollow) {
  const queryString = `?type=${type}&target=${targetId}&intent=${intentToFollow}`;
  return await fetch('/api/user/follow' + queryString, {
    method: 'POST'
  })
    .then(r => {
      return r.status === 200 ? intentToFollow : !intentToFollow;
    })
    .catch(error => {
      console.error(error);
      return !intentToFollow;
    });
}

// async function getFollow(targetId) {
//   const queryString = `?target=${targetId}`;
//   return await fetch('/api/user/follow' + queryString, {
//     method: 'GET'
//   })
//     .then(r => r.statusCode === 200)
//     .catch(error => {
//       console.error(error);
//       return false;
//     });
// }
