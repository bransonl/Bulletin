import * as React from "react";
import {connect} from "react-redux";

import {Error} from "../../state/types/error.type";
import {clearError, ErrorAction} from "../../state/actions/error.action";

interface PropsFromState {
  error: Error;
}

interface PropsFromDispatch {
  clearError: () => ErrorAction;
}

interface PassedProps {
  dismissible?: boolean;
}

type ErrorMessageProps = PropsFromState & PropsFromDispatch & PassedProps;

function renderDismissButton(props: ErrorMessageProps) {
  // check if false to "default" to true if not explicitly false
  if (props.dismissible === false) {
    return null;
  } else {
    return (
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="close"
        onClick={props.clearError}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    );
  }
}

const ErrorMessage: React.SFC<ErrorMessageProps> = (props) => {
  const {dismissible, error} = props;

  if (error && error.code && error.message) {
    const className = `alert alert-danger${dismissible ? " alert-dismissible fade show" : ""}`;
    return (
      <div className={className} role="alert">
        {renderDismissButton(props)}
        {error.message}
      </div>
    );
  }
  return null;
};

function mapStateToProps({error}: {error: Error}): PropsFromState {
  return {error};
}

export default connect<PropsFromState, PropsFromDispatch, PassedProps>(mapStateToProps, {clearError})(ErrorMessage);
