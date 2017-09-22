import * as React from "react";
import {
  Field, InjectedFormProps,
  reduxForm, WrappedFieldProps,
} from "redux-form";

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
        <Field
          name="username"
          placeholder="Username"
          component={this.renderField("Username")}
        />
        <Field
          name="password"
          placeholder="Password"
          component={this.renderField("Password")}
        />
        <button type="submit" className="btn btn-primary btn-block">
          Log In
        </button>
      </form>
    );
  }

  protected renderField(label: string): any {
    return (field: WrappedFieldProps) => {
      const {meta: {touched, error, submitFailed}} = field;
      const className = `form-group ${touched && error ? "has-danger" : ""}`;

      return (
        <div className={className}>
          <label>{label}</label>
          <input type="text" className="form-control" {...field.input} />
          <div className="form-text text-muted">
            {touched && submitFailed ? error : ""}
          </div>
        </div>
      );
    };
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
