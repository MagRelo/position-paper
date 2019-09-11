import React from 'react';
import TwitterLogin from 'react-twitter-auth';
import {
  Menu,
  MenuList,
  MenuLink,
  MenuButton,
  MenuItem
} from '@reach/menu-button';
import { Link } from '@reach/router';

const domain = window.location.origin || 'http://localhost:3000';
const loginPath = '/api/auth/twitter';
const requestPath = '/api/auth/twitter/reverse';

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        style: {
          borderBottom: isCurrent ? 'solid 1px' : null
        }
      };
    }}
  />
);

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
        <h1>
          <Link to="/">TalentRelay</Link>
        </h1>
        <div className="menu">
          <span className="hide-mobile">
            <NavLink to={'/search'}>Search</NavLink>
          </span>

          {props.activeSession ? (
            <NavLink to={'/user'}>{props.user.name}</NavLink>
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
                <MenuLink as={Link} to={'/search'}>
                  Search
                </MenuLink>

                <MenuLink as={Link} to={'/user'}>
                  Account
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
      </nav>
    </React.Fragment>
  );
}

export default Header;
