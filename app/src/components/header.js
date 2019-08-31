import React from 'react';
import TwitterLogin from 'react-twitter-auth';
import {
  Menu,
  MenuList,
  MenuLink,
  MenuButton,
  MenuItem
} from '@reach/menu-button';
import { NavLink, Link } from 'react-router-dom';

const domain = window.location.origin || 'http://localhost:3000';
const loginPath = '/api/auth/twitter';
const requestPath = '/api/auth/twitter/reverse';

function Header(props) {
  // twitter success
  function onSuccess(response) {
    response.json().then(user => {
      props.createSession(user);
    });
  }

  function onFailed(error) {
    console.log(error);
  }

  return (
    <React.Fragment>
      <nav className="header">
        <div className="menu">
          <span className="hide-mobile">
            <NavLink exact={true} activeClassName="is-active" to={'/search'}>
              Search
            </NavLink>
          </span>

          {props.activeSession ? (
            <NavLink activeClassName="is-active" to={'/user'}>
              {props.user.name}
            </NavLink>
          ) : null}

          {props.activeSession ? (
            <Menu>
              <MenuButton
                className="pure-button"
                style={{
                  background: 'none',
                  color: 'gray',
                  padding: 'none',
                  marginLeft: 0
                }}
              >
                <span aria-hidden>▾</span>
              </MenuButton>
              <MenuList>
                <MenuLink to={'/search'} className="show-mobile">
                  Search
                </MenuLink>

                <MenuItem onSelect={() => props.clearSession()}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <TwitterLogin
              loginUrl={domain + loginPath}
              requestTokenUrl={domain + requestPath}
              onFailure={onFailed}
              onSuccess={onSuccess}
              text="Login"
              className="pure-button login-button"
            />
          )}
        </div>

        <h1>
          <Link to="/">talent</Link>
        </h1>

        <h2>@ incentive ( dot ) exchange</h2>
      </nav>
    </React.Fragment>
  );
}

export default Header;
