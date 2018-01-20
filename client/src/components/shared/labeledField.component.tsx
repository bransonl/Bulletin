import * as React from "react";
import {Field, WrappedFieldProps} from "redux-form";

import FieldErrorMessage from "./error/fieldErrorMessage.component";

interface LabeledFieldProps extends WrappedFieldProps {
  disabled?: boolean;
  label?: string;
  description?: string;
  type?: string;
  placeholder?: string;
}

// Render the label of the field if prop label is provided
function renderLabel(field: LabeledFieldProps) {
  if (field.label) {
    return <label id={`${field.input.name}-label`}>{field.label}</label>;
  }
  return null;
}

// Render the description of the field if prop field is provided
function renderDescription(field: LabeledFieldProps) {
  if (field.description) {
    return (
      <small id={`${field.input.name}-hint`} className="form-text text-muted">
        {field.description}
      </small>
    );
  }
  return null;
}

// Render form error, othewise render global errors
function renderError(field: LabeledFieldProps) {
  const {meta: {touched, error, submitFailed}, input: {name}} = field;
  // prioritize client-sided error checking
  if (touched && submitFailed && error) {
    return <div className="form-text text-danger">{error}</div>;
  }
  return <FieldErrorMessage field={name} />;
}

const FieldComponent: React.SFC<LabeledFieldProps> = (field) => {
  const {meta: {touched, error}} = field;
  const className = `form-group ${touched && error ? "has-danger" : ""}`;

  return (
    <div className={className}>
      {renderLabel(field)}
      <input
        type={field.type}
        className="form-control"
        placeholder={field.placeholder}
        disabled={field.disabled}
        aria-labelledby={field.label ? `${field.input.name}-label` : ""}
        aria-describedby={field.description ? `${field.input.name}-hint` : ""}
        {...field.input}
      />
      {renderDescription(field)}
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
