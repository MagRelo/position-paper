import React, { useState, useContext, useEffect } from 'react';
import { Link, globalHistory } from '@reach/router';

// import { GiHeartPlus } from 'react-icons/gi';
import { FaBars } from 'react-icons/fa';

import { AuthContext } from '../App';
import { NavLink } from 'components/random';

function Header() {
  const { activeSession, user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    return globalHistory.listen((action) => {
      setMenuOpen(false);
    });
  }, []);

  return (
    <header>
      {/* <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div> */}

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
              <span className="header-title">Position</span>
              &#8201;
              <span className="header-title">Paper</span>
            </span>
          </Link>
        </div>

        <div className="header-container desktop-menu">
          <ul className="nav-list">
            {/* <li>
              <a href="/gethelp" className="btn btn-theme btn-sm">
                Get Help <GiHeartPlus />
              </a>
            </li>

            <li>
              <a href="/givehelp" className="btn btn-theme btn-sm">
                Give Help <FaHandHoldingHeart />
              </a>
            </li> */}

            <li>
              <NavLink to="/leaderboard">Leaderboard</NavLink>
            </li>

            {!activeSession ? (
              <li style={{ float: 'right' }}>
                <NavLink to="/login">Login</NavLink>
              </li>
            ) : null}

            {activeSession && user.type === 'Admin' ? (
              <li style={{ float: 'right' }}>
                <NavLink to="/admin">Admin</NavLink>
              </li>
            ) : null}

            {activeSession ? (
              <li style={{ float: 'right' }}>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="header-container mobile-menu">
          {menuOpen ? (
            <ul className="nav-list">
              {/* <li>
                <a href="/gethelp" className="btn btn-theme btn-sm">
                  Get Help <GiHeartPlus />
                </a>
              </li>

              <li>
                <a href="/givehelp" className="btn btn-theme btn-sm">
                  Give Help <FaHandHoldingHeart />
                </a>
              </li> */}

              <li>
                <NavLink to="/login">Login</NavLink>
              </li>

              {activeSession ? (
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
              ) : null}

              {activeSession && user.type === 'Admin' ? (
                <li>
                  <NavLink to="/admin">Admin</NavLink>
                </li>
              ) : null}
            </ul>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
