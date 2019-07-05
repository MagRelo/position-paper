import React from 'react';
import { Link } from 'react-router-dom';

import { IoMdLink, IoIosPerson } from 'react-icons/io';
import { GiInfo } from 'react-icons/gi';
import { MdInput } from 'react-icons/md';

function activityTile(item) {
  switch (item.verb) {
    case 'addUser':
      return (
        <div className="stream">
          <div>
            <IoIosPerson />
            New User
          </div>
          <p>{item.data.email}</p>
        </div>
      );
    case 'addQuery':
      return (
        <div className="stream">
          <div>
            <GiInfo />
            New Query
          </div>
          <Link to={'/query/' + item.data._id}>
            <p>{item.data.title}</p>
          </Link>
        </div>
      );
    case 'addLink':
      return (
        <div className="stream">
          <div>
            <IoMdLink /> New Link
          </div>
          <Link to={'/link/' + item.data.linkId}>
            <p>
              <span style={{ float: 'right' }}>
                {item.data.payoffs[item.data.generation]}
              </span>
              {item.data.query.title}
            </p>
          </Link>
        </div>
      );
    case 'addResponse':
      return (
        <div className="stream">
          <div>
            <MdInput />
            New Response
          </div>
          <p>{item.data.respondingUser.name}</p>
        </div>
      );
    default:
      break;
  }
}

function UserStream(props) {
  return (
    <ul style={{ padding: '0 1em' }}>
      {props.stream &&
        props.stream.map(item => {
          return (
            <li style={{ listStyle: 'none' }} key={item.id}>
              {activityTile(item)}
            </li>
          );
        })}
    </ul>
  );
}

export default UserStream;
