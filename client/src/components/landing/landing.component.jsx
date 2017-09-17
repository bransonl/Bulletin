import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginFormComponent from './login-form.component.jsx';
import RegisterFormComponent from './register-form.component.jsx';

import './landing.component.scss';

const PathNames = {
  LOGIN: '/',
  REGISTER: '/register'
};

const FormType = {
  LOGIN: 'Register',
  REGISTER: 'Back'
};

class LandingComponent extends Component {
  constructor (props) {
    super(props);

    const { pathname } = props.location;
    this.state = {
      formShown: pathname === PathNames.LOGIN ?
        FormType.LOGIN : FormType.REGISTER
    };
  }

  renderForm () {
    if (!this.state) {
      return;
    }

    if (this.state.formShown === FormType.LOGIN) {
      return <LoginFormComponent />
    } else if (this.state.formShown === FormType.REGISTER) {
      return <RegisterFormComponent />
    }
  }

  toggleFormType () {
    if (!this.state) {
      return;
    }

    if (this.state.formShown === FormType.LOGIN) {
      this.setState({
        formShown: FormType.REGISTER
      });
    } else if (this.state.formShown === FormType.REGISTER) {
      this.setState({
        formShown: FormType.LOGIN
      });
    }
  }

  render () {
    return (
      <div className="d-flex flex-column justify-content-center
                      align-items-center h-100">
        <div className="w-75 landing-form">
          <h1 className="text-left mb-4">Bulletin</h1>
          {this.renderForm()}
          <button type="button" className="btn btn-primary btn-block my-3"
                  onClick={this.toggleFormType.bind(this)}>
            {this.state && this.state.formShown ? this.state.formShown : ''}
          </button>
        </div>
      </div>
    );
  }
}

export default LandingComponent;
