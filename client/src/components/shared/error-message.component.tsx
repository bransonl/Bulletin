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

interface Props extends PropsFromState, PropsFromDispatch {}

const ErrorMessage: React.SFC<Props> = (props: Props) => {
  const {error} = props;

  if (error && error.code && error.message) {
    return (
      <div className="alert alert-danger alert-dismissable fade show" role="alert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="close"
          onClick={props.clearError}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        {error.message}
      </div>
    );
  }
  return null;
};

function mapStateToProps({error}: {error: Error}): PropsFromState {
  return {error};
}

export default connect<PropsFromState, PropsFromDispatch>(mapStateToProps, {clearError})(ErrorMessage);
