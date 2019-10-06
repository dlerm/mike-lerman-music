import '../styles/style.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import VideoSlider from './components/VideoSlider';
import AnimatedHero from './components/AnimatedHero';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      theme_mods: {}
    }
  }

  componentDidMount () {
    fetch('https://mikelermanmusic.com/wp-json/api/v1/theme-mods')
    .then(res => res.json())
    .then(theme_mods => {
      this.setState({
        ...this.state,
        theme_mods
      });
    });
  }

  render () {
    return (
      <div>
        <Header themeMods={this.state.theme_mods} />
        <main>
          <VideoSlider />
        </main>
        <footer></footer>
      </div>
    )
  }
}
 
// ReactDOM.render(<App />, document.getElementById('app'));

class App2 extends Component {

  constructor (props) {
    super(props);
    this.state = {
      theme_mods: {}
    }
  }

  componentDidMount () {
    fetch('https://mikelermanmusic.com/wp-json/api/v1/theme-mods')
    .then(res => res.json())
    .then(theme_mods => {
      this.setState({
        ...this.state,
        theme_mods
      });
    });
  }

  render () {
    return (
      <div>
        <Header themeMods={this.state.theme_mods} />
        <main>
          <AnimatedHero />
        </main>
        <footer></footer>
      </div>
    )
  }
}
 
ReactDOM.render(<App2 />, document.getElementById('app2'));

// HMR
if (module.hot) {
  module.hot.accept();
}

if (module.hot) {
  module.hot.dispose(() => {
    // reset/undo the behavior/side effect that as possibly enabled/enacted
  });
}