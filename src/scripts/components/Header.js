import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FAIcon from './FAIcon';
import ButtonIcon from './ButtonIcon';

class Header extends Component {
  constructor (props) {
    super(props);

    this.state = {
      menuIsOpen: false,
    }

    this.toggleMenu = this.toggleMenu.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  toggleMenu () {
    this.setState({ menuIsOpen: !this.state.menuIsOpen });
  }

  openMenu () {
    this.setState({ menuIsOpen: true });
  }

  closeMenu () {
    this.setState({ menuIsOpen: false });
  }

  render () {
    const { 
      facebook_url = false, 
      instagram_url = false, 
      soundcloud_url = false, 
      twitter_url = false, 
      youtube_url = false 
    } = this.props.themeMods;

    return (
      <header className="site-header">
        <nav className="site-nav site-nav--primary">
          <button className={`menu-toggle ${this.state.menuIsOpen ? 'is-active' : ''}`} onClick={this.toggleMenu} type="button" aria-label={`${this.state.menuIsOpen ? 'Close' : 'Open'} Menu`}>
            {[...Array(4)].map((x, i) =>
                <div className={`menu-toggle__line menu-toggle__line--${i}`}></div>
            )}
          </button>

          <h1 className={`site-header__title ${this.state.menuIsOpen ? 'is-active' : ''}`} title="Mike Lerman Music">Mike Lerman</h1>

          <ul className="icon-list social-list">
            {soundcloud_url &&
              <li className="icon-list__item">
                <a className="icon-list__link" title="Soundcloud" href={soundcloud_url} target="_blank">
                  <FAIcon name="soundcloud" className="icon-list__icon" />
                </a>
              </li>
            }
            {youtube_url &&
              <li className="icon-list__item">
                <a className="icon-list__link" title="Youtube" href={youtube_url} target="_blank">
                  <FAIcon name="youtube" className="icon-list__icon" />
                </a>
              </li>
            }
            {facebook_url &&
              <li className="icon-list__item">
                <a className="icon-list__link" title="Facebook" href={facebook_url} target="_blank">
                  <FAIcon name="facebook-square" className="icon-list__icon" />
                </a>
              </li>
            }
            {instagram_url &&
              <li className="icon-list__item">
                <a className="icon-list__link" title="Instagram" href={instagram_url} target="_blank">
                  <FAIcon name="instagram" className="icon-list__icon" />
                </a>
              </li>
            }
            <li className="icon-list__item">
              <button className={`btn btn--icon icon-list__link`} onClick={this.props.toggleVolume} title={this.props.muted ? 'Unmute': 'Mute' }>
                <FAIcon name={this.props.muted ? 'volume-off': 'volume-up' } className="icon-list__icon" />
              </button>
            </li>
          </ul>
        </nav>
        <nav className={`site-nav menu menu--v-slide menu--full-screen menu--flex menu--h-align-center menu--v-align-center ${this.state.menuIsOpen ? 'is-open' : ''}`}>
          <ul className="menu__list">
            <li className="menu__item">
              <Link to="/" className="menu__link" onClick={this.closeMenu}>home</Link>
            </li>
            <li className="menu__item">
              <Link to="/about" className="menu__link" onClick={this.closeMenu}>intro</Link>
            </li>
            <li className="menu__item">
              <Link to="/apologizer" className="menu__link" onClick={this.closeMenu}>apologizer</Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header;