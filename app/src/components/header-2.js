import React, { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';

import { AuthContext } from 'App';
import LinkedInLogin from 'components/linkedinLogin';

import { Link } from '@reach/router';

// temp
import logo from 'images/logo.png';

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
    <header>
      <div>
        <Link to="/">
          <img
            id="logo-img"
            className=" logo-img img-center"
            src={logo}
            alt="logo"
          ></img>
        </Link>
      </div>

      <div className="nav-list-container">
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
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
            </React.Fragment>
          ) : (
            <li>
              <LinkedInLogin>Login</LinkedInLogin>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
