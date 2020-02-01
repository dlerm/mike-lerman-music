import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer';

class VideoPage extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="video-page">
        <VideoPlayer { ...this.props } />
      </div>
    )
  }
}

export default VideoPage;