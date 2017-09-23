import * as React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";

import LabeledField from "../shared/labeled-field.component";

const enum LoginFormError {
  MISSING_USERNAME = "Please enter your username.",
  MISSING_PASSWORD = "Please enter your password.",
}

interface LoginFormFields {
  username: string;
  password: string;
}

interface LoginFormErrors {
  username?: string;
  password?: string;
}

class LoginFormComponent extends React.Component<InjectedFormProps, {}> {
  public render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <LabeledField
          type="text"
          name="username"
          placeholder="Username"
          props={{label: "Username"}}
        />
        <LabeledField
          type="password"
          name="password"
          placeholder="Password"
          props={{label: "Password"}}
        />
        <button type="submit" className="btn btn-primary btn-block">
          Log In
        </button>
      </form>
    );
  }

  protected onSubmit(values: LoginFormFields) {
  }
}

function validate(fields: LoginFormFields): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!fields.username) {
    errors.username = LoginFormError.MISSING_USERNAME;
  }
  if (!fields.password) {
    errors.password = LoginFormError.MISSING_PASSWORD;
  }

  return errors;
}

export {LoginFormError, LoginFormFields, LoginFormErrors, LoginFormComponent};
export default reduxForm({
  form: "LoginForm",
  validate,
})(LoginFormComponent);
