import * as React from "react";
import {connect} from "react-redux";
import {InjectedFormProps, reduxForm} from "redux-form";

import ErrorMessage from "../shared/error/errorMessage.component";
import {loginRequest, UserAction} from "../../state/actions/user.action";
import LabeledField from "../shared/labeledField.component";
import {clearError, ErrorAction} from "../../state/actions/error.action";

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
        placeholder="Username"
        props={{label: "Username", disabled: props.disabled}}
      />
      <LabeledField
        type="password"
        name="password"
        placeholder="Password"
        props={{label: "Password", disabled: props.disabled}}
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
    errors.username = LoginFormError.MISSING_USERNAME;
  }
  if (!fields.password) {
    errors.password = LoginFormError.MISSING_PASSWORD;
  }

  return errors;
}

export {LoginFormError, LoginFormFields, LoginFormErrors};

export default connect<null, PropsFromDispatch, OwnProps>(
  null,
  {clearError, loginRequest}
)(reduxForm<LoginFormFields>({
  form: "LoginForm",
  validate,
})(LoginFormComponent) as any);
