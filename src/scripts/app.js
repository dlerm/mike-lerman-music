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
      theme_mods: {
        loaded: false,
      },
      videos: [],
      muted: false,
    }

    this.toggleVolume = this.toggleVolume.bind(this);
    this.setVolume = this.setVolume.bind(this);
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
    fetch('//staging.mikelermanmusic.com/wp-json/api/v1/theme-mods')
    .then(res => res.json())
    .then(theme_mods => {
      return this.setState({
        theme_mods: { 
          ...theme_mods, 
          loaded: true 
        }
      });
    })
  }

  render () {
    return (
      <Router forceRefresh={true}>
        <Header themeMods={this.state.theme_mods} muted={this.state.muted} toggleVolume={this.toggleVolume} />
        <main>
          <Switch>
            <Route exact path="/">
              { this.state.theme_mods.loaded &&
                <AnimatedHero muted={this.state.muted} desktopImage={this.state.theme_mods.index_desktop_bg} mobileImage={this.state.theme_mods.index_mobile_bg} />
              }
            </Route>
            <Route exact path="/about">
              <VideoPage videoSlug="intro" autoPlay controls controlsList="nodownload" disablePictureInPicture />
            </Route>
            <Route exact path="/apologizer">
              <VideoPage videoSlug="apologizer" autoPlay controls controlsList="nodownload" disablePictureInPicture />
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