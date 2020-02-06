import React, { useContext } from 'react';
import { FaSearch, FaUserAlt, FaClipboardList } from 'react-icons/fa';

import { AuthContext } from 'App';
import LinkedInLogin from 'components/linkedinLogin';

import { Link } from '@reach/router';

// temp
// import logo from 'images/logo.png';

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

function Header(props) {
  const { activeSession } = useContext(AuthContext);

  return (
    <React.Fragment>
      <header>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>

        <div className="header-grid">
          <div className="header-container">
            <Link to="/">
              <span>
                <span className="header-title">Talent</span>
                &#8201;
                <span className="header-title">Relay</span>
              </span>
            </Link>
          </div>

          {activeSession ? null : (
            <div className="header-container">
              <LinkedInLogin>Sign In</LinkedInLogin>
            </div>
          )}

          <div className="header-container menu-container">
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
              ) : null}
            </ul>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}

export default Header;
