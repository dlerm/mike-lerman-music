import '../styles/style.scss';

import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/Header';
import VideoPage from './components/VideoPage';
import AnimatedHero from './components/AnimatedHero';
import JetpackForm from './components/JetpackForm';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {      
      theme_mods: {
        loaded: false,
      },
      menu: {
        items: [],
        loaded: false,
      },
      videos: [],
      muted: false,
    }

    this.toggleVolume = this.toggleVolume.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.fetchThemeMods = this.fetchThemeMods.bind(this);
    this.fetchMenu = this.fetchMenu.bind(this);
    this.setViewportHeightStyleVar = this.setViewportHeightStyleVar.bind(this);
    this.bindUI = this.bindUI.bind(this);
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
    this.setViewportHeightStyleVar();
    this.bindUI();
    this.fetchThemeMods();
    this.fetchMenu('main-menu');
    this.setVolume();
  }

  fetchThemeMods () {
    fetch('https://mikelermanmusic.com/wp-json/api/v1/theme-mods')
    .then(res => res.json())
    .then(theme_mods => {
      console.log("THEME_MODS", theme_mods);
      return this.setState({
        theme_mods: { 
          ...theme_mods, 
          loaded: true 
        }
      });
    });
  }

  fetchMenu (slug) {
    fetch(`https://mikelermanmusic.com/wp-json/api/v1/menus/${slug}`)
    .then(res => res.json())
    .then(menu => {
      console.log("MENU", menu);
      return this.setState({
        menu: { 
          items: menu, 
          loaded: true 
        }
      }, (state) => {
        console.log('STATE', this.state)
      });
    });
  }

  setViewportHeightStyleVar () {
    const vh100 = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${vh100}px`);
  }

  bindUI () {
    window.addEventListener('resize', this.setViewportHeightStyleVar);
  }

  render () {
    return (
      <Router forceRefresh={true}>
        <Header themeMods={this.state.theme_mods} menu={this.state.menu} muted={this.state.muted} toggleVolume={this.toggleVolume} />
        <main>
          <Switch>
            <Route exact path="/">
              { this.state.theme_mods.loaded &&
                <AnimatedHero muted={this.state.muted} desktopImage={this.state.theme_mods.index_desktop_bg} mobileImage={this.state.theme_mods.index_mobile_bg} />
              }
            </Route>

            <Route exact path="/music_video/:slug" component={VideoPage} />
            
            <Route exact path="/about">
              <Redirect to="/music_video/intro" />
            </Route>

            <Route exact path="/apologizer">
              <Redirect to="/music_video/intro" />
            </Route>
            
            <Route path="/contact">
              <JetpackForm className="contact-form" formPageId="2" ajax={true} successMsg="Thanks for your message! 🤘" errorMsg="Something's not right, please try again. 🤔" />
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
// if (module.hot) {
//   module.hot.accept();
// }

// if (module.hot) {
//   module.hot.dispose(() => {
//     // reset/undo the behavior/side effect that as possibly enabled/enacted
//   });
// }