import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AnimatedHero extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loaded: false,
      image: '//mikelermanmusic.com/wp-content/uploads/2019/09/hero-bg.jpg',
    };
  }

  componentDidMount () {
    const img = new Image();
    img.onload = () => {
      this.setState({ loaded: true });
    }
    img.src = this.state.image;
  }

  render () {
    return (
      <section className="hero hero--animated">
        { this.state.loaded &&
          <div>
            <div className="hero__image-wrapper">
              <img className="hero__image" src={this.state.image} alt="MLM" />
            </div>
            <div className="hero__image-wrapper hero__image-wrapper--blur">
              <img className="hero__image hero__image--blur" src={this.state.image} alt="MLM" />
            </div>
            <div className="hero__overlay">
              <h1 className="hero__overlay-title">Mike Lerman</h1>
              <h2 className="hero__overlay-subtitle">Underdog</h2>
              <div className="hero__overlay-content">
                <p className="hero__overlay-text">click the hound for sound</p>
                <img class="hero__overlay-arrow" src="http://mikelermanmusic.com/wp-content/uploads/2019/10/arrow-curved-right.png" />
                <Link className="hero__overlay-button" to="/about">
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