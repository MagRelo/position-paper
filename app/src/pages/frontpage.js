import React from 'react';

import Feed from 'pages/position/feed';

function FrontPage(props) {
  return (
    <section className="container">
      <div>
        <h1>Frontpage</h1>

        <div className="grid grid-3">
          <div>
            <div className="h2">Latest</div>
            <Feed />
          </div>
          <div>
            <div className="h2">Biggest</div>
            <Feed />
          </div>
          <div>
            <div className="h2">Whatever</div>
            <Feed />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FrontPage;
