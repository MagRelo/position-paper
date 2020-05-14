import React from 'react';
import Teaser from 'pages/position/positionTeaser';

function FeedPage({ items, hideUser }) {
  return (
    <div>
      {items && !items.length ? <p>No Props</p> : null}
      {items &&
        items.map((prop) => {
          return (
            <React.Fragment key={prop._id}>
              <Teaser position={prop} hideUser={hideUser} />
              <div className="mb-4"></div>
            </React.Fragment>
          );
        })}
    </div>
  );
}

export default FeedPage;
