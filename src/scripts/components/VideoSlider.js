import React, { Component } from 'react';

class VideoSlider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeSlideIndex: 0,
      videos: []
    };
  }

  componentDidMount () {
    fetch('https://mikelermanmusic.com/wp-json/api/v1/music-videos/intro')
    .then(res => res.json())
    .then(videos => {
      this.setState({
        ...this.state,
        videos
      });
    });
  }

  render () {
    return (
      <div className="video-slider">
        <ul className="video-slider__video-list">
        {this.state.videos.map((video, index) => (
          <li className="video-slider__video-item" key={index}>
              <video className="video-slider__video" autoPlay controls>
                <source src={video.video_file} type="video/mp4" />
              </video>
          </li>
        ))}
        </ul>
        {/*<div className="video-slider__overlay">
          <ul className="video-slider__video-meta-list">
          {this.state.videos.map((video,index) => (
            <li className="video-slider__video-meta" key={index}>{video.post_title}</li>
          ))}
          </ul>
        </div>*/}
      </div>
    )
  }
}

export default VideoSlider;