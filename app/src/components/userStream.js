import React from 'react';
import { Link } from 'react-router-dom';

import { IoMdLink, IoIosPerson } from 'react-icons/io';
import { GiInfo } from 'react-icons/gi';
import { GoGitMerge, GoBroadcast } from 'react-icons/go';
import { MdInput } from 'react-icons/md';

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
      return isUser ? `You Added a Query` : `New Query From ${data.user.email}`;
    case 'addLink':
      return isUser
        ? `You Linked to ${data.query.title}`
        : `New Link for ${data.query.title}`;
    case 'addResponse':
      return isUser
        ? `You responded to ${data.query.title}`
        : `New response to ${data.query.title}`;
    case 'addFollow:User':
      return isUser
        ? `You Followed ${data.email}`
        : `${data.email} Followed You`;
    case 'addFollow:Query':
      return isUser
        ? `You Followed ${data.title}`
        : `New Follower for ${data.title}`;
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
        : `New Link for ${data.query.title}`;
    case 'addResponse':
      return isUser
        ? `You responded to ${data.query.title}`
        : `New response to ${data.query.title}`;
    case 'addFollow:User':
      return isUser
        ? `You Followed ${data.email}`
        : `${data.email} Followed You`;
    case 'addFollow:Query':
      return isUser
        ? `You Followed ${data.title}`
        : `New Follower for ${data.title}`;
    default:
      return 'New activity';
  }
}

function activityTile(item, user) {
  const isUser = user === item.actor;
  return (
    <div className="stream">
      <div className="stream-label">
        {getIcon(item.verb)}
        {getLabel(item.verb, isUser, item.data)}
      </div>
      <p>{getContent(item.verb, isUser, item.data)}</p>
    </div>
  );
}

function UserStream(props) {
  return (
    <ul style={{ padding: '0 1em' }}>
      {props.stream &&
        props.stream.map(item => {
          return (
            <li style={{ listStyle: 'none' }} key={item.id}>
              {activityTile(item, props.userId)}
            </li>
          );
        })}
    </ul>
  );
}

export default UserStream;
