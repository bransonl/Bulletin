import * as React from "react";
import {connect} from "react-redux";
import {reduxForm, InjectedFormProps} from "redux-form";

import LabeledField from "../shared/labeledField.component";
import {
  LoginFormError, LoginFormErrors, LoginFormFields,
} from "./loginForm.component";
import {signupRequest, UserAction} from "../../state/user/user.action";
import {clearError, ErrorAction} from "../../state/error/error.action";

const SignupFormError = {
  MISSING_CONFIRM_PASSWORD: "Please confirm your password.",
  PASSWORDS_DO_NOT_MATCH: "Your passwords do not match.",
};

interface SignupFormFields extends LoginFormFields {
  confirmPassword: string;
}

interface SignupFormErrors extends LoginFormErrors {
  confirmPassword?: string;
}

interface PropsFromDispatch {
  clearError: () => ErrorAction;
  signupRequest: (username: string, password: string) => UserAction;
}

interface OwnProps {
  disabled?: boolean;
}

type SignupFormProps =
  InjectedFormProps
  & PropsFromDispatch
  & OwnProps;

const SignupFormComponent: React.SFC<SignupFormProps> = (props) => {
  const {handleSubmit} = props;

  const onSubmit = (values: SignupFormFields) => {
    props.clearError();
    props.signupRequest(values.username, values.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <LabeledField
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        disabled={props.disabled}
      />
      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={props.disabled}
      >
        Sign Up
      </button>
    </form>
  );
};

function validate(fields: SignupFormFields): SignupFormErrors {
  const errors: SignupFormErrors = {};

  if (!fields.username) {
    errors.username = LoginFormError.MISSING_USERNAME;
  }
  if (!fields.password) {
    errors.password = LoginFormError.MISSING_PASSWORD;
  }
  if (!fields.confirmPassword) {
    errors.confirmPassword = SignupFormError.MISSING_CONFIRM_PASSWORD;
  } else if (fields.confirmPassword !== fields.password) {
    errors.confirmPassword = SignupFormError.PASSWORDS_DO_NOT_MATCH;
  }

  return errors;
}

export default connect<null, PropsFromDispatch, OwnProps>(
  null,
  {clearError, signupRequest},
)(reduxForm<SignupFormFields>({
  form: "SignupForm",
  validate,
})(SignupFormComponent) as any);
