import React from 'react';

import { Link } from '@reach/router';

// temp
import logo from 'images/logo.png';

function Header(props) {
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

                {/* TEMP hide all 
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

                <div
                  className="collapse navbar-collapse"
                  id="navbarNavDropdown"
                >
                  <ul className="navbar-nav ml-auto mr-auto">
                    <li className="nav-item">
                      <a className="nav-link" href="/#employers">
                        For Employers
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
                  </ul>
                </div>

                {/* Login/Logout

                <div className="right-nav align-items-center d-flex justify-content-end list-inline">
                  <Link className="nav-link" to="/search">
                    Search Jobs
                  </Link>
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

                TEMP hide all */}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
