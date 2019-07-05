import React from 'react';

function activityTile(item) {
  switch (item.verb) {
    case 'addUser':
      return (
        <div className="panel">
          <p className="label">New User</p>
          <p>{item.data.email}</p>
        </div>
      );
    case 'addQuery':
      return (
        <div className="panel">
          <p className="label">New Query</p>
          <p>{item.data.title}</p>
        </div>
      );
    case 'addLink':
      return (
        <div className="panel">
          <p className="label">New Link</p>
          <p>{item.data.query.title}</p>
        </div>
      );
    case 'addResponse':
      return (
        <div className="panel">
          <p className="label">New Response</p>
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
