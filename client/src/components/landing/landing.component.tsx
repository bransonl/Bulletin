import * as React from "react";
import {connect} from "react-redux";

import LoginFormComponent from "./login-form.component";
import SignupFormComponent from "./signup-form.component";

import "./landing.component.scss";

const enum PathNames {
  LOGIN = "/",
  SIGNUP = "/signup",
}

const enum FormType {
  LOGIN = "Sign up",
  SIGNUP = "Back",
}

interface State {
  formShown: FormType;
}

class LandingComponent extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    const {pathname} = props.location;
    this.state = {
      formShown: pathname === PathNames.LOGIN ?
        FormType.LOGIN : FormType.SIGNUP,
    };

    this.toggleFormType = this.toggleFormType.bind(this);
  }

  public render() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <div className="w-75 landing-form">
          <h1 className="text-left mb-4">Bulletin</h1>
          {this.renderForm()}
          <button
            type="button"
            className="btn btn-primary btn-block my-3"
            onClick={this.toggleFormType}
          >
            {this.state && this.state.formShown ? this.state.formShown : ""}
          </button>
        </div>
      </div>
    );
  }

  private renderForm() {
    if (!this.state) {
      return;
    }

    if (this.state.formShown === FormType.LOGIN) {
      return <LoginFormComponent />;
    } else if (this.state.formShown === FormType.SIGNUP) {
      return <SignupFormComponent />;
    }
  }

  private toggleFormType() {
    if (!this.state) {
      return;
    }

    if (this.state.formShown === FormType.LOGIN) {
      this.setState({
        formShown: FormType.SIGNUP,
      });
    } else if (this.state.formShown === FormType.SIGNUP) {
      this.setState({
        formShown: FormType.LOGIN,
      });
    }
  }
}

export default LandingComponent;