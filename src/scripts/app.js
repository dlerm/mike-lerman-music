import '../styles/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import VideoSlider from './components/VideoSlider';

const App = () => (
  <div>
    <Header />
    <main>
      <VideoSlider />
    </main>
    <footer></footer>
  </div>
);
 
ReactDOM.render(<App />, document.getElementById('app'));

// HMR
if (module.hot) {
  module.hot.accept();
  console.log('HMR')
}

if (module.hot) {
  module.hot.dispose(() => {
    // reset/undo the behavior/side effect that as possibly enabled/enacted
  });
}