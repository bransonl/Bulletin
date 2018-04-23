import * as React from "react";
import {connect} from "react-redux";

import {Error} from "../types/error";
import {clearError, ErrorAction} from "../state/error.action";

interface PropsFromState {
  error: Error;
}

interface PropsFromDispatch {
  clearError: () => ErrorAction;
}

interface OwnProps {
  dismissible?: boolean; // default: true
}

type ErrorMessageProps =
  PropsFromState &
  PropsFromDispatch &
  OwnProps;

function renderDismissButton(dismissible: boolean, action: any) {
  if (dismissible) {
    return (
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="close"
        onClick={action}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    );
  }
  return false;
}

const ErrorMessage: React.SFC<ErrorMessageProps> = (props) => {
  const {dismissible = true, error} = props;

  if (error && error.code && error.message) {
    const className = `alert alert-danger${dismissible ? " alert-dismissible fade show" : ""}`;
    return (
      <div className={className} role="alert">
        {renderDismissButton(dismissible, props.clearError)}
        {error.message}
      </div>
    );
  }
  return null;
};

function mapStateToProps({error}: PropsFromState): PropsFromState {
  return {error};
}

export default connect<PropsFromState, PropsFromDispatch, OwnProps>(
  mapStateToProps,
  {clearError},
)(ErrorMessage);