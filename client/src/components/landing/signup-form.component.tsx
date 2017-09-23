import * as React from "react";
import {reduxForm} from "redux-form";

import LabeledField from "../shared/labeled-field.component";
import {
  LoginFormComponent, LoginFormError, LoginFormErrors,
  LoginFormFields,
} from "./login-form.component";

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

class SignupFormComponent extends LoginFormComponent {
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
          Register
        </button>
      </form>
    );
  }

  protected onSubmit(fields: SignupFormFields): void {
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
})(SignupFormComponent);
