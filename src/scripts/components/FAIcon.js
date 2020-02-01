import React, { Component } from 'react';

class FAIcon extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <i className={`icon fa fa-${this.props.name} fas fas-${this.props.name} icon--${this.props.name} ${this.props.className || ''}`}></i>
    )
  }
}

export default FAIcon;