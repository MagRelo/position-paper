import React, { useState, useContext, useEffect } from 'react';
import { Link, globalHistory } from '@reach/router';

import { FaSearch, FaUserAlt, FaClipboardList, FaBars } from 'react-icons/fa';

import { AuthContext } from 'App';
import LinkedInLogin from 'components/linkedinLogin';

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        className: isCurrent ? 'nav-link active' : 'nav-link'
      };
    }}
  />
);

function Header() {
  const { activeSession } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    return globalHistory.listen(action => {
      setMenuOpen(false);
    });
  }, []);

  return (
    <header>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>

      <div className="header-grid">
        <div className="header-container">
          <button
            className="btn button-unstyled menu-button"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            <FaBars />
          </button>

          <Link to="/">
            <span>
              <span className="header-title">Talent</span>
              &#8201;
              <span className="header-title">Relay</span>
            </span>
          </Link>
        </div>

        <div className="header-container desktop-menu">
          <ul className="nav-list">
            <li>
              <NavLink className="nav-link" to="/search">
                Search Jobs <FaSearch />
              </NavLink>
            </li>

            {activeSession ? (
              <React.Fragment>
                <li>
                  <NavLink className="nav-link" to="/profile">
                    <FaUserAlt />
                  </NavLink>
                </li>

                <li>
                  <NavLink className="nav-link" to="/dashboard">
                    <FaClipboardList /> Dashboard
                  </NavLink>
                </li>
              </React.Fragment>
            ) : (
              <li>
                <LinkedInLogin className="btn btn-theme btn-sm">
                  Sign In
                </LinkedInLogin>
              </li>
            )}
          </ul>
        </div>

        <div className="header-container mobile-menu">
          {menuOpen ? (
            <ul className="nav-list">
              <li>
                <NavLink className="nav-link" to="/search">
                  Search Jobs <FaSearch />
                </NavLink>
              </li>

              {activeSession ? (
                <React.Fragment>
                  <li>
                    <NavLink className="nav-link" to="/dashboard">
                      <FaClipboardList /> Dashboard
                    </NavLink>
                  </li>

                  <li>
                    <NavLink className="nav-link" to="/profile">
                      <FaUserAlt /> Account
                    </NavLink>
                  </li>
                </React.Fragment>
              ) : (
                <div className="button-wrapper">
                  <LinkedInLogin className="btn btn-theme btn-sm">
                    Sign In
                  </LinkedInLogin>
                </div>
              )}
            </ul>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
