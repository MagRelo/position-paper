import React from 'react';

function Footer(props) {
  return (
    <footer>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="container">
        <div className="grid grid-2">
          <div style={{ zIndex: 1 }}>
            <div className="footer-logo">
              <span>
                <span className="footer-title">Talent</span>
                &#8201;
                <span className="footer-title">Relay</span>
              </span>
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Excepturi totam possimus dicta tenetur nesciunt cupiditate
              mollitia consequatur, dolores asperiores fugiat aut iusto delectus
              architecto quibusdam hic est rem? Deleniti, illum.
            </p>
          </div>

          <div style={{ zIndex: 1 }}>
            <div
              style={{
                height: '70px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <h4>
                <span>Useful Links</span>
              </h4>
            </div>

            <div className="footer-list justify-content-between d-flex">
              <ul className="list-unstyled w-100">
                <li>
                  <a href="/terms">Terms</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <div className="container">
          <div
            className="copyright"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <span>Talent Relay | 2020</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
