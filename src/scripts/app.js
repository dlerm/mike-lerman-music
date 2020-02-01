import '../styles/style.scss';

import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import VideoPage from './components/VideoPage';
import AnimatedHero from './components/AnimatedHero';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      theme_mods: {},
      videos: [],
      muted: false,
    }

    this.volumeToggle = React.createRef();
    this.toggleVolume = this.toggleVolume.bind(this);
    this.setVolume = this.setVolume.bind(this);
  }

  preloadFirstVideo () {
    if (this.state.videos.length) fetch(this.state.videos[0].video_file);
  }

  toggleVolume (event) {
    this.setState({ muted: !this.state.muted });
  }

  setVolume (muted) {
    document.querySelectorAll('audio, video').forEach(element => element.muted = muted || this.state.muted);
  }

  componentDidUpdate (prevtProps, prevState, snapshot) {
    this.setVolume();
  }

  componentDidMount () {
    fetch('https://mikelermanmusic.com/wp-json/api/v1/theme-mods')
    .then(res => res.json())
    .then(theme_mods => {
      this.setState({ theme_mods });
    });

    fetch('https://mikelermanmusic.com/wp-json/api/v1/music-videos/intro')
    .then(res => res.json())
    .then(videos => {
      this.setState({ videos });
      this.preloadFirstVideo();
    });
  }

  render () {
    return (
      <Router>
        <Header themeMods={this.state.theme_mods} muted={this.state.muted} toggleVolume={this.toggleVolume} />
        <main>
          <Switch>
            <Route exact path="/">
              <AnimatedHero muted={this.state.muted} />
            </Route>
            <Route path="/about">
              <VideoPage videoSlug="intro" autoPlay controls controlsList="nodownload" disablePictureInPicture />
            </Route>
          </Switch>
        </main>
      </Router>
    )
  }
}

 
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// HMR
if (module.hot) {
  module.hot.accept();
}

if (module.hot) {
  module.hot.dispose(() => {
    // reset/undo the behavior/side effect that as possibly enabled/enacted
  });
}