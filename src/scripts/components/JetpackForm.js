import React, { Component } from 'react';

class JetpackForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      ajax: this.props.ajax || false,
      submitted: false,
      processing: false,
      success: false,
      successMsg: this.props.successMsg,
      errorMsg: this.props.errorMsg,
    };
    this.formContainer = React.createRef();
    this.form = React.createRef();
    this.getFormContent = this.getFormContent.bind(this);
    this.bindUI = this.bindUI.bind(this);
  }

  getFormContent () {
    if (!this.props.formPageId) return console.error('<JetpackForm> Missing prop: formPageId');
    fetch(`https://mikelermanmusic.com/wp-json/wp/v2/pages/${this.props.formPageId}`)
    .then((res) => res.json())
    .then(res => this.formContainer.current.innerHTML = res.content.rendered)
    .then(() => this.bindUI())
    .catch(console.error);
  }

  componentDidMount () {
    this.getFormContent();
  }

  bindUI () {
    if (this.state.ajax) {
      this.formContainer.current.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const action = form.getAttribute('action');
        const method = form.getAttribute('method');
        const body = new URLSearchParams(new FormData(form)).toString();
        this.setState({ processing: true, submitted: true })
        fetch(action, {
          method,
          body,
        })
        .then(res => {
          this.setState({ processing: false, success: true })
        })
        .then(console.log)
        .catch(err => {
          this.setState({ processing: false, success: false })
        })
      })  
    }
  }

  render () {
    const classNames = this.props.className ? this.props.className : '';
    const displayForm = !this.state.submitted || (this.state.submitted && !this.state.success);
    const displayMessage = this.state.ajax && this.state.submitted && !this.state.processing;
    const message = this.state.success ? this.state.successMsg : this.state.errorMsg
    return (
      <div className="jetpack-form">
        { displayForm &&
          <div className={classNames} ref={this.formContainer}></div>
        }
        { displayMessage &&
          <div className={`jetpack-form__message ${ this.state.success ? 'jetpack-form__message--success': 'jetpack-form__message--error' }`}>
            { message }
          </div>
        }
      </div>
    )
  }
}

export default JetpackForm;