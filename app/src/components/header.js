import React, { useContext } from 'react';
import { AuthContext } from 'App';

import { Link } from '@reach/router';

// import {
//   Menu,
//   MenuList,
//   MenuLink,
//   MenuButton,
//   MenuItem
// } from '@reach/menu-button';

// const NavLink = props => (
//   <Link
//     {...props}
//     getProps={({ isCurrent }) => {
//       // the object returned here is passed to the
//       // anchor element's props

//       // return {
//       //   style: {
//       //     borderBottom: isCurrent ? 'solid 1px' : null,
//       //     color: isCurrent ? 'white' : null
//       //   }
//       // };

//       return {
//         className: isCurrent ? 'nav-link active' : 'active'
//       };
//     }}
//   />
// );

// temp
import logo from 'images/logo.png';

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

                {/* Menu */}
                <div
                  className="collapse navbar-collapse"
                  id="navbarNavDropdown"
                >
                  {activeSession ? (
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to="/search">
                          Search
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    <ul className="navbar-nav ml-auto mr-auto">
                      <React.Fragment>
                        <li className="nav-item">
                          <a className="nav-link" href="/#customers">
                            Customers
                          </a>
                        </li>
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
                      </React.Fragment>
                    </ul>
                  )}
                </div>

                {/* Login/Logout */}

                <div className="right-nav align-items-center d-flex justify-content-end list-inline">
                  {activeSession ? (
                    <Link className="btn btn-theme btn-sm" to="/dashboard">
                      <span>Dashboard</span>
                    </Link>
                  ) : (
                    <Link className="btn btn-theme btn-sm" to="/login">
                      <span>Login</span>
                    </Link>
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
