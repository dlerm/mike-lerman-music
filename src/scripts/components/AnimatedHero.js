import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AnimatedHero extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loaded: false,
      images: {
        // See: https://developer.wordpress.com/docs/photon/
        desktop: {
          src: this.props.desktopImage.replace('https://', 'https://i0.wp.com/'),
          loaded: false,
        },
        mobile: {
          src: this.props.mobileImage.replace('https://', 'https://i0.wp.com/'),
          loaded: false,
        },
      },
    };
  }

  componentDidMount () {
    const imgDesktop = new Image();
    const imgMobile = new Image();

    imgDesktop.onload = () => {
      this.setState({ 
        images: { 
          ...this.state.images, 
          desktop: { 
            ...this.state.images.desktop, 
            loaded: true,
          },
        },
      });
      if (this.state.images.mobile.loaded) {
        this.setState({ 
          loaded: true,
        }); 
      }
    };

    imgMobile.onload = () => {
      this.setState({ 
        images: { 
          ...this.state.images, 
          mobile: { 
            ...this.state.images.mobile, 
            loaded: true,
          },
        },
      });
      if (this.state.images.desktop.loaded) {
        this.setState({ 
          loaded: true,
        }); 
      }
    };

    imgDesktop.src = this.state.images.desktop.src;
    imgMobile.src = this.state.images.mobile.src;
  }

  render () {
    return (
      <section className="hero hero--animated">
        { this.state.loaded &&
          <div>
            <picture className="hero__image-wrapper">
              <source media="(min-width: 1201px)" srcset={`${this.state.images.desktop.src}?w=1440, ${this.state.images.desktop.src}?w=1440&zoom=2 2x`} />
              <source media="(min-width: 1025px)" srcset={`${this.state.images.desktop.src}?w=1200, ${this.state.images.desktop.src}?w=1200&zoom=2 2x`} />
              <source media="(min-width: 769px)" srcset={`${this.state.images.desktop.src}?w=1024, ${this.state.images.desktop.src}?w=1024&zoom=2 2x`} />
              <source media="(min-width: 481px)" srcset={`${this.state.images.desktop.src}?w=768, ${this.state.images.desktop.src}?w=768&zoom=2 2x`} />
              <source media="(min-width: 421px)" srcset={`${this.state.images.mobile.src}?w=480, ${this.state.images.mobile.src}?w=480&zoom=2 2x`} />
              <source media="(min-width: 376px)" srcset={`${this.state.images.mobile.src}?w=420, ${this.state.images.mobile.src}?w=420&zoom=2 2x`} />
              <source media="(min-width: 321px)" srcset={`${this.state.images.mobile.src}?w=375, ${this.state.images.mobile.src}?w=375&zoom=2 2x`} />
              <source media="(min-width: 0px)" srcset={`${this.state.images.mobile.src}?w=320, ${this.state.images.mobile.src}?w=320&zoom=2 2x`} />
              <img className="hero__image" src={this.state.images.desktop.src} srcset={this.state.images.desktop.src} alt="MLM" />
            </picture>
            <div className="hero__image-wrapper hero__image-wrapper--blur">
              <img className="hero__image hero__image--blur" src={this.state.images.desktop.src} alt="MLM" />
            </div>
            <div className="hero__overlay">
              <h1 className="hero__overlay-title">Mike Lerman</h1>
              <h2 className="hero__overlay-subtitle">Underdog</h2>
              <div className="hero__overlay-content">
                <p className="hero__overlay-text">click the hound for sound</p>
                <img class="hero__overlay-arrow screen-sm-up" src="http://mikelermanmusic.com/wp-content/uploads/2019/10/arrow-curved-right.png" />
                <Link className="hero__overlay-button" to="/apologizer">
                  <img class="hero__button-icon style-svg" src={`${window.themeDir}/images/underdog-logo.svg`} />
                </Link> 
              </div>
            </div>
          </div>
        }
        { !this.state.loaded &&
          <div>
          <div className="loader ripple ripple--1"></div>
          <div className="loader ripple ripple--2"></div>
          <div className="loader ripple ripple--3"></div>
          </div>
        }
      </section>
    )
  }
}

export default AnimatedHero;