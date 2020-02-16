import React, { Component } from 'react';
import FAIcon from './FAIcon';

class VideoPlayer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      videoFile: false,
    }
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
  }

  componentDidMount () {
    fetch(`https://mikelermanmusic.com/wp-json/api/v1/music-videos/${this.props.videoSlug}`)
    .then(res => res.json())
    .then(res => res[0])
    .then(video => {
      this.setState({
        videoFile: video.video_file,
      });
    });
  }

  toggleFullscreen () {
    const video = document.getElementById('video');
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.mozRequestFullScreen) video.mozRequestFullScreen();
    else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
    else if (video.msRequestFullscreen) video.msRequestFullscreen();
  }

  render () {
    return (
      <div className="video-player">
        <video { ...this.props } className="video-player__video" id="video">
          <source src={this.state.videoFile || 'https://mikelermanmusic.com/wp-content/uploads/2020/01/FiresideChatPromo.mp4'} type="video/mp4" />
        </video>
        <button className={`video-player__btn btn--expand btn btn--icon`} onClick={this.toggleFullscreen} title="Enable Full Screen">
          <FAIcon name="arrows-alt" className="video-player__btn-icon" />
        </button>
      </div>
    )
  }
}

export default VideoPlayer;