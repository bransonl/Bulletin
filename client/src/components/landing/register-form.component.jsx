import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { LoginFormErrors, LoginFormComponent } from './login-form.component.jsx';

const RegisterFormErrors = {
  MISSING_CONFIRM_PASSWORD: 'Please confirm your password.',
  PASSWORDS_DO_NOT_MATCH: 'Your passwords do not match.'
};

class RegisterFormComponent extends LoginFormComponent {
  onSubmit (values) {
    console.log(values);
  }

  render () {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field label="Username" name="username" placeholder="Username"
               component={this.renderField} />
        <Field label="Password" name="password" placeholder="Password"
               component={this.renderField} />
        <Field label="Confirm Password" name="confirmPassword"
               placeholder="Confirm Password"
               component={this.renderField} />
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
      </form>
    );
  }
}

function validate (fields) {
  const errors = {};

  if (!fields.username) {
    errors.username = LoginFormErrors.MISSING_USERNAME;
  }
  if (!fields.password) {
    errors.password = LoginFormErrors.MISSING_PASSWORD;
  }
  if (!fields.confirmPassword) {
    errors.confirmPassword = RegisterFormErrors.MISSING_CONFIRM_PASSWORD;
  } else if (fields.confirmPassword !== fields.password) {
    errors.confirmPassword = RegisterFormErrors.PASSWORDS_DO_NOT_MATCH;
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'RegisterForm'
})(RegisterFormComponent);
