import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer';

class VideoPage extends Component {
  constructor (props) {
    super(props);
  }

  render (thing) {
    return (
      <div className="video-page">
        <VideoPlayer videoSlug={this.props.match.params.slug} autoPlay controls controlsList="nodownload" disablePictureInPicture />
      </div>
    )
  }
}

export default VideoPage;