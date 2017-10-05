import * as React from "react";
import {Field, WrappedFieldProps} from "redux-form";

import FieldErrorMessage from "./field-error-message.component";

interface LabeledFieldProps extends WrappedFieldProps {
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

function renderField(field: LabeledFieldProps) {
  const {meta: {touched, error}} = field;
  const className = `form-group ${touched && error ? "has-danger" : ""}`;

  return (
    <div className={className}>
      <label>{field.label}</label>
      <input type={field.type} className="form-control" {...field.input} />
      {renderError(field)}
    </div>
  );
}

const LabeledField = (props: any) => (
  <Field
    {...props}
    component={renderField as any}
  />
);

export default LabeledField;
