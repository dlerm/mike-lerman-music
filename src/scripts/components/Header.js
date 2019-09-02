import React, { Component } from 'react';
import IconList from './IconList';

class Header extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <header className="site-header">
        <h1 className="logo" title="Mike Lerman Music">M<span className="screen-sm-up">ike </span>L<span className="screen-sm-up">erman</span></h1>
        <IconList />
      </header>
    )
  }
}

export default Header;