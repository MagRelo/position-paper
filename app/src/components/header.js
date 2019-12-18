import React from 'react';
import LinkedIn from './linkedinLogin';

import {
  Menu,
  MenuList,
  MenuLink,
  MenuButton,
  MenuItem
} from '@reach/menu-button';
import { Link } from '@reach/router';

// Twitter
// const domain = window.location.origin || 'http://localhost:3000';
// const loginPath = '/api/auth/twitter';
// const requestPath = '/api/auth/twitter/reverse';

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        style: {
          borderBottom: isCurrent ? 'solid 1px' : null,
          color: isCurrent ? 'white' : null
        }
      };
    }}
  />
);

function Header(props) {
  return (
    <React.Fragment>
      <nav className="header">
        <h1>
          <Link to="/">Talent Relay</Link>
        </h1>

        <NavLink to={'/search'}>Search</NavLink>

        <span style={{ margin: '0 1em' }}></span>

        {props.activeSession ? (
          <React.Fragment>
            <NavLink to={'/user'}>{props.user.name}</NavLink>
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
          </React.Fragment>
        ) : (
          <LinkedIn createSession={props.createSession} />
        )}
      </nav>
    </React.Fragment>
  );
}

export default Header;
