import * as React from "react";
import {connect} from "react-redux";

import {FieldError} from "../types/error";

interface PropsFromState {
  error: FieldError;
}

interface OwnProps {
  field: string;
}

type FieldErrorMessageProps =
  PropsFromState
  & OwnProps;

const FieldErrorMessage: React.SFC<FieldErrorMessageProps> = (props) => {
  const {error, field} = props;

  if (error && error.code && error.errors && error.errors[field] && error.errors[field].length > 0) {
    return <div className="form-text text-danger show">{error.errors[field][0]}</div>;
  }
  return null;
};

function mapStateToProps({error}: {error: FieldError}) {
  return {error};
}

export default connect<PropsFromState, null, OwnProps>(
  mapStateToProps,
  null,
)(FieldErrorMessage);
