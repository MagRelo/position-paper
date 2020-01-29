import React, { Component } from 'react';

// import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

// import 'css/menu.css';

import logo from 'images/logo.png';
import telegram_footer from 'images/face.png';
import twitter_footer from 'images/face.png';
import medium_footer from 'images/face.png';
import telegram from 'images/face.png';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.targetElement = null;
  }

  componentDidMount() {
    // select element *not* to lock scrolling
    this.targetElement = document.querySelector('#mobile-nav');
  }

  openMenu() {
    // disable/re-able scrolling on body
    // disableBodyScroll(this.targetElement);

    // update state for css classes
    this.setState({ open: !this.state.open });
  }

  closeMenu() {
    // enableBodyScroll(this.targetElement);

    // update state for css classes
    this.setState({ open: false });
  }

  linkClicked() {
    this.closeMenu();
  }

  // display classes
  menuClass() {
    return 'mobile-menu ' + (this.state.open ? '' : 'hide');
  }

  backgroundClass() {
    return 'menu-background ' + (this.state.open ? 'expand' : 'hide');
  }

  itemClass() {
    return this.state.open ? 'animate' : '';
  }

  menuFooterClass() {
    return 'menu-footer ' + (this.state.open ? 'open' : 'hide');
  }

  hamburgerClass(name) {
    let className = '';

    if (this.state.open) {
      if (name === 'x') {
        className = 'x rotate45';
      }

      if (name === 'y') {
        className = 'y hide';
      }

      if (name === 'z') {
        className = 'z rotate135';
      }

      return className;
    } else {
      return name;
    }
  }

  render() {
    return (
      <header>
        {/* Desktop */}
        <nav className="desktop-menu">
          <img className="desktop-logo" src={logo} alt="pragma logo" />

          <ul className="desktop-nav">
            <li>
              <a href="/#about">About</a>
            </li>
            <li>
              <a href="/#roadmap">Roadmap</a>
            </li>
            <li>
              <a href="https://medium.com/@PragmaProject">Blog</a>
            </li>
          </ul>
        </nav>

        <div className={this.backgroundClass()} />

        {/* Mobile */}

        {/* <img className="mobile-closed-logo" src={logo} alt="pragma logo" /> */}

        <nav id="mobile-nav" className={this.menuClass()}>
          {/* <img className="logo" src={logo} alt="pragma logo" /> */}
          <ul>
            <li className={this.itemClass()}>
              <a
                onClick={() => {
                  this.linkClicked();
                }}
                href="/#about"
              >
                About
              </a>
            </li>
            <li className={this.itemClass()}>
              <a
                onClick={() => {
                  this.linkClicked();
                }}
                href="/#roadmap"
              >
                Roadmap
              </a>
            </li>
            <li className={this.itemClass()}>
              <a href="https://medium.com/@PragmaProject">Blog</a>
            </li>
          </ul>
        </nav>

        {/* Bottom buttons */}
        <div className={this.menuFooterClass()}>
          <div className="button-box">
            <a
              className="pure-button blue-button"
              href="https://t.me/PragmaProject"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="telegram-button">
                Join us on Telegram
                {/* <img
                  className="telegram-logo"
                  src={telegram}
                  alt="telegram logo"
                /> */}
              </span>
            </a>
          </div>

          <ul className="social-links">
            <a href="https://twitter.com/PragmaProject">
              <li>{/* <img src={twitter_footer} alt="" /> */}</li>{' '}
            </a>

            <a href="https://t.me/PragmaProject">
              <li>{/* <img src={telegram_footer} alt="" /> */}</li>
            </a>

            <a href="https://medium.com/@PragmaProject">
              <li>{/* <img src={medium_footer} alt="" /> */}</li>
            </a>
          </ul>
        </div>

        {/* Burger */}
        <div className="burger" onClick={this.openMenu.bind(this)}>
          <div className={this.hamburgerClass('x')} />
          <div className={this.hamburgerClass('y')} />
          <div className={this.hamburgerClass('z')} />
        </div>
      </header>
    );
  }
}

export default Menu;
