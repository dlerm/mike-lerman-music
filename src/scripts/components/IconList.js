import React, { Component } from 'react';

class IconList extends Component {
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
      <nav>
        <ul className="icon-list social-list">
          {soundcloud_url &&
            <li className="icon-list__item">
              <a className="icon-list__link" title="soundcloud" href={soundcloud_url} target="_blank">
                <i className="fa fa-soundcloud icon-list__icon icon icon--soundcloud"></i>
              </a>
            </li>
          }
          {youtube_url &&
            <li className="icon-list__item">
              <a className="icon-list__link" title="youtube" href={youtube_url} target="_blank">
                <i className="fa fa-youtube icon-list__icon icon icon--youtube"></i>
              </a>
            </li>
          }
          {facebook_url &&
            <li className="icon-list__item">
              <a className="icon-list__link" title="facebook" href={facebook_url} target="_blank">
                <i className="fa fa-facebook-square icon-list__icon icon icon--facebook"></i>
              </a>
            </li>
          }
          {instagram_url &&
            <li className="icon-list__item">
              <a className="icon-list__link" title="instagram" href={instagram_url} target="_blank">
                <i className="fa fa-instagram icon-list__icon icon icon--instagram"></i>
              </a>
            </li>
          }
        </ul>
      </nav>
    )
  }
}

export default IconList;