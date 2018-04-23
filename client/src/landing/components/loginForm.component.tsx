import * as React from "react";
import {connect} from "react-redux";
import {InjectedFormProps, reduxForm} from "redux-form";

import ErrorMessage from "../../error/components/errorMessage.component";
import {loginRequest, UserAction} from "../../shared/state/user.action";
import LabeledField from "../../shared/components/labeledField.component";
import {clearError, ErrorAction} from "../../error/state/error.action";

const enum LoginFormError {
  MissingUsername = "Please enter your username.",
  MissingPassword = "Please enter your password.",
}

interface LoginFormFields {
  username: string;
  password: string;
}

interface LoginFormErrors {
  username?: string;
  password?: string;
}

interface PropsFromDispatch {
  clearError: () => ErrorAction;
  loginRequest: (username: string, password: string) => UserAction;
}

interface OwnProps {
  disabled?: boolean;
}

type LoginFormProps =
  InjectedFormProps<LoginFormFields>
  & PropsFromDispatch
  & OwnProps;

const LoginFormComponent: React.SFC<LoginFormProps> = (props) => {
  const {handleSubmit} = props;

  const onSubmit = (values: LoginFormFields) => {
    props.clearError();
    props.loginRequest(values.username, values.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ErrorMessage dismissible={false} />
      <LabeledField
        type="text"
        name="username"
        label="Username"
        disabled={props.disabled}
      />
      <LabeledField
        type="password"
        name="password"
        label="Password"
        disabled={props.disabled}
      />
      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={props.disabled}
      >
        Log In
      </button>
    </form>
  );
};

function validate(fields: LoginFormFields): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!fields.username) {
    errors.username = LoginFormError.MissingUsername;
  }
  if (!fields.password) {
    errors.password = LoginFormError.MissingPassword;
  }

  return errors;
}

export {LoginFormError, LoginFormFields, LoginFormErrors};

export default connect<null, PropsFromDispatch, OwnProps>(
  null,
  {clearError, loginRequest},
)(reduxForm<LoginFormFields>({
  form: "LoginForm",
  validate,
})(LoginFormComponent) as any);