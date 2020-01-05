import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IconList from './IconList';

class Header extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <header className="site-header">
        <Link to="/"><h1 className="logo" title="Mike Lerman Music">M<span className="screen-sm-up">ike </span>L<span className="screen-sm-up">erman</span></h1></Link>
        <IconList themeMods={this.props.themeMods} />
      </header>
    )
  }
}

export default Header;