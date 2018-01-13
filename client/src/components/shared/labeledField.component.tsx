import * as React from "react";
import {Field, WrappedFieldProps} from "redux-form";

import FieldErrorMessage from "./error/fieldErrorMessage.component";

interface LabeledFieldProps extends WrappedFieldProps {
  disabled?: boolean;
  label?: string;
  type?: string;
}

function renderError(field: WrappedFieldProps) {
  const {meta: {touched, error, submitFailed}, input: {name}} = field;
  // prioritize client-sided error checking
  if (touched && submitFailed && error) {
    return <div className="form-text text-danger">{error}</div>;
  } else {
    return <FieldErrorMessage field={name} />;
  }
}

const FieldComponent: React.SFC<LabeledFieldProps> = (field) => {
  const {meta: {touched, error}} = field;
  const className = `form-group ${touched && error ? "has-danger" : ""}`;

  return (
    <div className={className}>
      <label>{field.label}</label>
      <input
        type={field.type}
        className="form-control"
        disabled={field.disabled}
        {...field.input}
      />
      {renderError(field)}
    </div>
  );
};

// TODO: figure out typing
const LabeledField: React.SFC<any> = (props) => (
  <Field
    {...props}
    component={FieldComponent}
  />
);

export default LabeledField;
