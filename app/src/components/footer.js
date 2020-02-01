import React from 'react';

function Footer(props) {
  return (
    <footer>
      <div className="container">
        <div className="grid grid-2">
          <div>
            <div className="footer-logo">Talent Relay</div>
            <p>
              TalentRelay is the easiest way to hire the best Software
              Developers, DevOps Engineers, and Engineering Leaders that others
              can't. By using our innovative technology, we find the best
              candidates talent that other search services can’t. Then we
              deliver them to that to you at a fraction of the price.
            </p>
          </div>

          <div>
            <div
              style={{
                height: '70px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <h4>Useful Links</h4>
            </div>

            <div className="footer-list justify-content-between d-flex">
              <ul className="list-unstyled w-100">
                <li>
                  <a href="about-us.html">About Us</a>
                </li>
                <li>
                  <a href="team.html">Team</a>
                </li>
                <li>
                  <a href="contact.html">Contact Us</a>
                </li>
              </ul>
              <ul className="list-unstyled w-100">
                <li>
                  <a href="faq.html">FAQ</a>
                </li>

                <li>
                  <a href="privacy-policy.html">Privacy Policy</a>
                </li>
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
          <div className="copyright">
            <span>Talent Relay | 2020</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
