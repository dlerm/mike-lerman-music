import React, { Component } from 'react';

class VideoPlayer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      videoFile: false,
    }
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

  render () {
    return (
      <div className="video-player">
        <video { ...this.props } className="video-player__video">
          <source src={this.state.videoFile || 'https://mikelermanmusic.com/wp-content/uploads/2020/01/FiresideChatPromo.mp4'} type="video/mp4" />
        </video>
      </div>
    )
  }
}

export default VideoPlayer;