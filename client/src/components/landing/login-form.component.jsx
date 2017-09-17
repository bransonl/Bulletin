import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

export const LoginFormErrors = {
  MISSING_USERNAME: 'Please enter your username.',
  MISSING_PASSWORD: 'Please enter your password.'
};

export class LoginFormComponent extends Component {
  renderField (field) {
    const { meta: { touched, error, submitFailed } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input type="text" className="form-control" {...field.input} />
        <div className="form-text text-muted">
          {touched && submitFailed ? error : ''}
        </div>
      </div>
    );
  }
  
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
        <button type="submit" className="btn btn-primary btn-block">
          Log In
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
  
  return errors;
}

export default reduxForm({
  validate,
  form: 'LoginForm'
})(LoginFormComponent);
