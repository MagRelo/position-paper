import React from 'react';
// import { Link } from 'react-router-dom';

// icons
import { IoMdLink, IoIosPerson } from 'react-icons/io';
import { GiInfo } from 'react-icons/gi';
import { GoGitMerge, GoBroadcast } from 'react-icons/go';
import { MdInput } from 'react-icons/md';

//
import { useTrail, animated } from 'react-spring';
// const trail = useTrail(number, {opacity: 1})

function getIcon(activityType) {
  switch (activityType) {
    case 'addUser':
      return <IoIosPerson />;
    case 'addQuery':
      return <GoBroadcast />;
    case 'addLink':
      return <IoMdLink />;
    case 'addResponse':
      return <MdInput />;
    case 'addFollow:User':
      return <GoGitMerge />;
    case 'addFollow:Query':
      return <GoGitMerge />;
    default:
      return <GiInfo />;
  }
}

function getLabel(activityType, isUser, data) {
  switch (activityType) {
    case 'addUser':
      return isUser ? `Welcome!` : `New User`;
    case 'addQuery':
      return isUser ? `You Added a Query` : `New Query`;
    case 'addLink':
      return isUser ? `You Added a Link` : `New Child Link Created`;
    case 'addResponse':
      return isUser ? `You responded to a query` : `New response to your query`;
    case 'addFollow:User':
      return isUser ? `New Follower Added` : `New Follower`;
    case 'addFollow:Link':
      return isUser ? `You Followed a query` : `New Follower for query`;
    default:
      return 'New activity';
  }
}

function getContent(activityType, isUser, data) {
  switch (activityType) {
    case 'addUser':
      return isUser ? `Welcome!` : `New User`;
    case 'addQuery':
      return isUser ? `You Added a Query` : `New Query From ${data.user.email}`;
    case 'addLink':
      return isUser
        ? `You Linked to ${data.query.title}`
        : `New Link Created for ${data.query.title}`;
    case 'addResponse':
      return isUser
        ? `You responded to ${data.query.title}`
        : `New response to ${data.query.title}`;
    case 'addFollow:User':
      return isUser
        ? `You Followed ${data.email}`
        : `${data.email} Followed You`;
    case 'addFollow:Link':
      return isUser
        ? `You Followed ${data.query.title}`
        : `New Follower for ${data.query.title}`;
    default:
      return 'New activity';
  }
}

function activityTile(item, user) {
  if (!item.data) return <div>error: no data</div>;

  const isUser = user === item.actor;
  const userHighlightColor = '#0279db';
  const userShadow = '0px 2px 5px 0px rgba(119, 137, 166, 0.58)';
  const otherColor = 'rgb(14, 165, 29)';
  const otherShadow = '0px 2px 5px 0px rgba(112, 148, 116, 0.58)';

  return (
    <div
      className="stream"
      style={{
        marginTop: '1rem',
        borderTop: isUser
          ? `solid 2px ${userHighlightColor}`
          : `solid 2px ${otherColor}`,
        boxShadow: isUser ? `${userShadow}` : `${otherShadow}`
      }}
    >
      <div className="stream-label">
        {getIcon(item.verb)}
        {getLabel(item.verb, isUser, item.data)}
      </div>
      <p>{getContent(item.verb, isUser, item.data)}</p>
    </div>
  );
}

function AnimatedUserStream(props) {
  const config = { mass: 5, tension: 2000, friction: 200 };
  const trail = useTrail(props.stream.length, {
    config,
    opacity: 1,
    x: 0,
    height: 80,
    from: { opacity: 0, x: 20, height: 0 }
  });

  return (
    <div>
      {trail.map(({ x, height, ...rest }, index) => {
        return (
          <animated.div
            key={index}
            style={{
              ...rest,
              transform: x.interpolate(x => `translate3d(0,${x}px,0)`)
            }}
          >
            {activityTile(props.stream[index], props.userId)}
          </animated.div>
        );
      })}
    </div>
  );
}

export default AnimatedUserStream;
