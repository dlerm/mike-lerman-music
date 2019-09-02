import React, { Component } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSoundcloud, faYoutube, faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';

class IconList extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <ul className="icon-list social-list">
        <li className="icon-list__item">
          <a className="icon-list__link" title="soundclound" href="https://soundcloud.com/mikefrommesia" target="_blank">
            <i className="fa fa-soundcloud icon-list__icon icon icon--soundcloud"></i>
          </a>
        </li>
        <li className="icon-list__item">
          <a className="icon-list__link" title="youtube" href="http://www.youtube.com/user/mikefrommesia" target="_blank">
            <i className="fa fa-youtube icon-list__icon icon icon--youtube"></i>
          </a>
        </li>
        <li className="icon-list__item">
          <a className="icon-list__link" title="facebook" href="https://www.facebook.com/MikeLermanMusic" target="_blank">
            <i className="fa fa-facebook-square icon-list__icon icon icon--facebook"></i>
          </a>
        </li>
        <li className="icon-list__item">
          <a className="icon-list__link" title="instagram" href="https://www.instagram.com/mikelerman__" target="_blank">
            <i className="fa fa-instagram icon-list__icon icon icon--instagram"></i>
          </a>
        </li>
      </ul>
    )
  }
}

export default IconList;