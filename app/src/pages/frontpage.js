import React from 'react';

import Feed from 'pages/position/feed';

function FrontPage(props) {
  return (
    <section className="container">
      <div>
        <div className="grid grid-frontpage">
          <h1>Frontpage</h1>

          <div>
            <div className="h2">Recently Rek'd</div>
            <Feed />
          </div>

          <div>
            <div className="h2">Latest</div>
            <Feed />
          </div>

          <div>
            <div className="h2">Most Popular</div>
            <Feed />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FrontPage;
