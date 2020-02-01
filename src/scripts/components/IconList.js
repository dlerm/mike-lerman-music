import React, { Component } from 'react';
import FAIcon from './FAIcon';
import ButtonIcon from './ButtonIcon';

class IconList extends Component {
  constructor (props) {
    super(props);
    // this.toggleVolume = this.toggleVolume.bind(this);
    this.thing = this.thing.bind(this);
  }

  // toggleVolume (event) {
  //   console.log(this);
  //   // this.state.icon = this.state.icon === 'volume-up' ? 'volume-off' : 'volume-up';
  //   // document.querySelector('video').muted = !document.querySelector('video').muted;
  // }

  thing() {
    console.log(this);
  }

  componentDidMount () {
    console.log('IconList', this)
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
                <FAIcon name="soundcloud" classes="icon-list__icon" />
              </a>
            </li>
          }
          {youtube_url &&
            <li className="icon-list__item">
              <a className="icon-list__link" title="youtube" href={youtube_url} target="_blank">
                <FAIcon name="youtube" classes="icon-list__icon" />
              </a>
            </li>
          }
          {facebook_url &&
            <li className="icon-list__item">
              <a className="icon-list__link" title="facebook" href={facebook_url} target="_blank">
                <FAIcon name="facebook-square" classes="icon-list__icon" />
              </a>
            </li>
          }
          {instagram_url &&
            <li className="icon-list__item">
              <a className="icon-list__link" title="instagram" href={instagram_url} target="_blank">
                <FAIcon name="instagram" classes="icon-list__icon" />
              </a>
            </li>
          }
          <li className="icon-list__item">
            <ButtonIcon icon="volume-up" click={this.props.toggleVolume} className="icon-list__link" muted={this.props.muted} />  
          </li>
        </ul>
      </nav>
    )
  }
}

export default IconList;