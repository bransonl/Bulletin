import * as React from "react";
import {connect} from "react-redux";

import LoginFormComponent from "./loginForm.component";
import SignupFormComponent from "./signupForm.component";
import {clearError, ErrorAction} from "../../state/actions/error.action";

import "./landing.component.scss";
import {RouteComponentProps} from "react-router";

const enum PathNames {
  LOGIN = "/login",
  SIGNUP = "/signup",
}

const enum FormType {
  LOGIN = "login",
  SIGNUP = "signup",
}

interface PropsFromState {
  isLoading: boolean;
}

interface PropsFromDispatch {
  clearError: () => ErrorAction;
}

type LandingProps =
  RouteComponentProps<null>
  & PropsFromState
  & PropsFromDispatch;

interface LandingState {
  formShown: FormType;
}

class LandingComponent extends React.Component<LandingProps, LandingState> {
  constructor(props: any) {
    super(props);

    const {pathname} = props.location;
    this.state = {
      formShown: pathname === PathNames.LOGIN ?
        FormType.LOGIN : FormType.SIGNUP,
    };

    // FIXME: uncomment this when react-hot-loader is fixed
    // this.toggleFormType = this.toggleFormType.bind(this);
  }

  public render() {
    const formChangeButtonText = this.state && this.state.formShown ?
      (this.state.formShown === FormType.LOGIN ? "Sign Up" : "Back") : "";
    return (
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <div className="w-75 landing-form">
          <h1 className="text-left mb-4">Bulletin</h1>
          {this.renderForm()}
          {/* FIXME: unbind toggleFormType when react-hot-loader is fixed */}
          <button
            type="button"
            className="btn btn-primary btn-block my-3"
            onClick={this.toggleFormType.bind(this)}
            disabled={this.props.isLoading}
          >
            {formChangeButtonText}
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
      return <LoginFormComponent disabled={this.props.isLoading} />;
    } else if (this.state.formShown === FormType.SIGNUP) {
      return <SignupFormComponent disabled={this.props.isLoading} />;
    }
  }

  private toggleFormType() {
    if (!this.state) {
      return;
    }

    this.props.clearError();
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

function mapStateToProps({isLoading}: PropsFromState): PropsFromState {
  return {isLoading}
}

export default connect<PropsFromState, PropsFromDispatch>(
  mapStateToProps,
  {clearError}
)(LandingComponent);
