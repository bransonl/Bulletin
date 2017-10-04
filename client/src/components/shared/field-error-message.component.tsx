import * as React from "react";
import {connect} from "react-redux";

import {FieldError} from "../../state/types/error.type";

interface PropsFromState {
  error: FieldError;
}

interface PassedProps {
  field: string;
}

interface Props extends PropsFromState, PassedProps {}

const FieldErrorMessage: React.SFC<Props> = (props: Props) => {
  const {error, field} = props;

  if (error && error.code && error.errors && error.errors[field] && error.errors[field].length > 0) {
    return <div className="form-text text-danger show">{error.errors[field][0]}</div>;
  }
  return null;
};

function mapStateToProps({error}: {error: FieldError}) {
  return {error};
}

export default connect<PropsFromState, {}, PassedProps>(mapStateToProps, null)(FieldErrorMessage);
