import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FAIcon from './FAIcon';
import ButtonIcon from './ButtonIcon';

class Header extends Component {
  constructor (props) {
    super(props);
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
        <Link to="/" className="logo__link">
          <h1 className="logo" title="Mike Lerman Music">M<span className="screen-sm-up">ike </span>L<span className="screen-sm-up">erman</span></h1>
        </Link>
        <nav>
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
      </header>
    )
  }
}

export default Header;