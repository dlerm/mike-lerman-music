import React, { Component } from 'react';
// import FAIcon from './FAIcon';

class ButtonIcon extends Component {
  constructor (props) {
    super(props);
    this.state = {
      label: this.props.label,
      icon: this.props.icon,
      type: this.props.type,
    }
  }

  render () {
    return (
      <button className={`btn ${this.state.type} ${this.props.className}`} onClick={this.props.click}>
        <div>
        {this.state.label &&
         <span>this.state.label</span>
        }
        <FAIcon name={this.state.icon} />
        </div>
      </button>
      
    )
  }
}

export default ButtonIcon;