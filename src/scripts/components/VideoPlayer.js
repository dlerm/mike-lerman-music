import React, { Component } from 'react';
import FAIcon from './FAIcon';

class VideoPlayer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      videoSlug: this.props.videoSlug,
      videoFile: false,
      playing: false,
    }
    this.video = React.createRef();
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.updateVideo = this.updateVideo.bind(this);
    this.toggleVideoState = this.toggleVideoState.bind(this);
  }

  componentDidMount () {
    this.updateVideo();

    this.video.current.addEventListener('play', (event) => {
      if (!this.state.playing) this.toggleVideoState(event, false);
    })

    this.video.current.addEventListener('pause', (event) => {
      if (this.state.playing) this.toggleVideoState(event, false);
    }) 
  }

  updateVideo () {
    fetch(`https://mikelermanmusic.com/wp-json/api/v1/music-videos/${this.state.videoSlug}`)
    .then(res => res.json())
    .then(res => res[0])
    .then(video => {
      this.setState({ videoFile: video.video_file });
    });
  }

  toggleFullscreen (event) {
    event.stopPropagation();
    if (this.video.current.requestFullscreen) this.video.current.requestFullscreen();
    else if (this.video.current.mozRequestFullScreen) this.video.current.mozRequestFullScreen();
    else if (this.video.current.webkitRequestFullscreen) this.video.current.webkitRequestFullscreen();
    else if (this.video.current.msRequestFullscreen) this.video.current.msRequestFullscreen();
  }

  toggleVideoState (event, doAction = true) {
    event.stopPropagation();
    this.setState({ playing: !this.state.playing }, () => {
      if (doAction) this.state.playing ? this.video.current.play() : this.video.current.pause();  
    });
  }

  render () {
    return (
      <div className="video-player">
        <video { ...this.props } className="video-player__video" id="video" ref={this.video} onTouchEnd={this.toggleVideoState}>
          { this.state.videoFile &&
            <source src={this.state.videoFile} type="video/mp4" />
          }
        </video>
        <button className={`video-player__btn btn--expand btn btn--icon`} onClick={this.toggleFullscreen} onTouchStart={this.toggleFullscreen} title="Enable Full Screen">
          <FAIcon name="arrows-alt" className="video-player__btn-icon" />
        </button>
        { !this.state.playing &&
          <button className={`video-player__btn btn--play btn btn--icon`} onClick={this.toggleVideoState} onTouchStart={this.toggleVideoState} title="Play">
            <FAIcon name="play" className="video-player__btn-icon" />
          </button>
        }
      </div>
    )
  }
}

export default VideoPlayer;