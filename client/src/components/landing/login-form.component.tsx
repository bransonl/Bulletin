import * as React from "react";
import {connect} from "react-redux";
import {InjectedFormProps, reduxForm} from "redux-form";

import ErrorMessage from "../shared/error-message.component";
import {loginRequest, UserAction} from "../../state/actions/user.action";
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

interface LoginFormProps extends InjectedFormProps {
  loginRequest: (username: string, password: string) => UserAction;
}

class LoginFormComponent extends React.Component<LoginFormProps, {}> {
  constructor(props: LoginFormProps) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  public render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <ErrorMessage />
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
    this.props.loginRequest(values.username, values.password);
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
})(connect(null, {loginRequest})(LoginFormComponent));
