import React, { useContext } from 'react';
import { AuthContext } from 'App';
import LinkedInLogin from 'components/linkedinLogin';

import { Link } from '@reach/router';

// temp
import logo from 'images/logo.png';

// import {
//   Menu,
//   MenuList,
//   MenuLink,
//   MenuButton,
//   MenuItem
// } from '@reach/menu-button';

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props

      // return {
      //   style: {
      //     borderBottom: isCurrent ? 'solid 1px' : null,
      //     color: isCurrent ? 'white' : null
      //   }
      // };

      return {
        className: isCurrent ? 'nav-link active' : 'nav-link'
      };
    }}
  />
);

function Header(props) {
  const { activeSession } = useContext(AuthContext);

  return (
    <header id="site-header" className="header">
      <div id="header-wrap">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <Link className="navbar-brand logo" to="/">
                  <img
                    id="logo-img"
                    className="img-center"
                    src={logo}
                    alt="logo"
                  ></img>
                </Link>

                {/* Mobile button
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNavDropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  {' '}
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                 */}

                {/* Menu */}
                <div
                  className="collapse navbar-collapse"
                  id="navbarNavDropdown"
                >
                  {activeSession ? null : (
                    <ul className="navbar-nav ml-auto mr-auto">
                      <React.Fragment>
                        <li className="nav-item">
                          <a className="nav-link" href="/#how">
                            How It Works
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/#getstarted">
                            Get Started
                          </a>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/employers">
                            Employers
                          </NavLink>
                        </li>
                      </React.Fragment>
                    </ul>
                  )}
                </div>

                {/* Login/Logout */}

                <div className="right-nav align-items-center d-flex justify-content-end list-inline">
                  <Link className="nav-link" to="/search">
                    Search Jobs
                  </Link>
                  {activeSession ? (
                    <Link className="btn btn-theme btn-sm" to="/dashboard">
                      <span>Dashboard</span>
                    </Link>
                  ) : (
                    <LinkedInLogin>Login</LinkedInLogin>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
