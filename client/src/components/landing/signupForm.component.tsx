import * as React from "react";
import {connect} from "react-redux";
import {reduxForm, InjectedFormProps} from "redux-form";

import LabeledField from "../shared/labeledField.component";
import {LoginFormError, LoginFormErrors, LoginFormFields} from "./loginForm.component";
import {signupRequest, UserAction} from "../../state/actions/user.action";
import {clearError, ErrorAction} from "../../state/actions/error.action";

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

type SignupFormProps = InjectedFormProps & PropsFromDispatch;

class SignupFormComponent extends React.Component<SignupFormProps, {}> {
  constructor(props: SignupFormProps) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

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
        <LabeledField
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          props={{label: "Confirm Password"}}
        />
        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
      </form>
    );
  }

  protected onSubmit(values: SignupFormFields): void {
    this.props.clearError();
    this.props.signupRequest(values.username, values.password);
  }
}

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

export default reduxForm({
  form: "SignupForm",
  validate,
})(connect<null, PropsFromDispatch>(
  null,
  {clearError, signupRequest}
)(SignupFormComponent));
