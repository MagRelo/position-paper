import React from 'react';

import LogoWhite from 'images/logo-white.png';

function Footer(props) {
  return (
    <React.Fragment>
      <footer className="footer theme-bg">
        <div className="primary-footer">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6">
                <div className="footer-logo mb-3">
                  <img
                    id="footer-logo-white-img"
                    src={LogoWhite}
                    className="img-center"
                    alt=""
                  />
                </div>
                <p className="mb-0">
                  TalentRelay is the easiest way to hire the best Software
                  Developers, DevOps Engineers, and Engineering Leaders that
                  others can't. By using our innovative technology, we find the
                  best candidates talent that other search services can’t. Then
                  we deliver them to that to you at a fraction of the price.
                </p>
              </div>

              {/* Links
              <div className="col-lg-6 col-md-6 sm-mt-5">
                <h4 className="mb-4 text-white">Useful Links</h4>
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
               */}
            </div>
          </div>
        </div>
        <div className="secondary-footer mt-5 text-center">
          <div className="container">
            <div className="copyright">
              <div className="row">
                <div className="col-md-12">
                  {' '}
                  <span>Talent Relay | 2019</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Footer;

// "Contact Us" panel
// <div className="col-lg-4 col-md-12 md-mt-5">
//                 <div className="footer-cntct">
//                   <h4 className="mb-4 text-white">Get In Touch</h4>
//                   <ul className="media-icon list-unstyled">
//                     <li>
//                       <p className="mb-0">
//                         <i className="la la-map-o"></i>{' '}
//                         <b>423B, Road Wordwide Country, USA</b>
//                       </p>
//                     </li>
//                     <li>
//                       <i className="la la-envelope-o"></i>{' '}
//                       <a href="mailto:themeht23@gmail.com">
//                         <b>themeht23@gmail.com</b>
//                       </a>
//                     </li>
//                     <li>
//                       <i className="la la-phone"></i>{' '}
//                       <a href="tel:+912345678900">
//                         <b>+91-234-567-8900</b>
//                       </a>
//                     </li>
//                   </ul>
//                   <div className="social-icons mt-3">
//                     <ul className="list-inline">
//                       <li>
//                         <a href="#">
//                           <i className="fab fa-facebook-f"></i>
//                         </a>
//                       </li>
//                       <li>
//                         <a href="#">
//                           <i className="fab fa-dribbble"></i>
//                         </a>
//                       </li>
//                       <li>
//                         <a href="#">
//                           <i className="fab fa-skype"></i>
//                         </a>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
