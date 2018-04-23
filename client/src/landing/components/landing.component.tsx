import * as React from "react";
import {connect} from "react-redux";
import {Route, RouteComponentProps} from "react-router-dom";

import {clearError, ErrorAction} from "../../error/state/error.action";
import LoginFormComponent from "./loginForm.component";
import SignupFormComponent from "./signupForm.component";
import ButtonLink from "../../shared/components/buttonLink.component";

import "./landing.component.scss";

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

function renderLoginForm(isLoading: boolean) {
  return () => {
    return (
      <div>
        <LoginFormComponent disabled={isLoading} />
        <ButtonLink
          to="/signup"
          className="btn-primary btn-block my-3"
          disabled={isLoading}
        >
          Sign Up
        </ButtonLink>
      </div>
    );
  };
}

function renderSignupForm(isLoading: boolean) {
  return () => {
    return (
      <div>
        <SignupFormComponent disabled={isLoading} />
        <ButtonLink
          to="/login"
          className="btn-primary btn-block my-3"
          disabled={isLoading}
        >
          Back to Log In
        </ButtonLink>
      </div>
    );
  };
}

const LandingComponent: React.SFC<LandingProps> = ({isLoading}) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="w-75 landing-form">
        <h1 className="text-left mb-4">Bulletin</h1>
        <Route
          path="/login"
          render={renderLoginForm(isLoading)}
        />
        <Route
          path="/signup"
          render={renderSignupForm(isLoading)}
        />
      </div>
    </div>
  );
};

function mapStateToProps({isLoading}: PropsFromState): PropsFromState {
  return {isLoading};
}

export default connect<PropsFromState, PropsFromDispatch>(
  mapStateToProps,
  {clearError},
)(LandingComponent);