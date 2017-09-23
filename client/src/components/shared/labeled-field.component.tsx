import * as React from "react";
import {Field, InjectedFormProps, WrappedFieldProps} from "redux-form";

interface LabeledTypedWrappedFieldProps extends WrappedFieldProps {
  label: string;
  type: string;
}

const renderField = (field: LabeledTypedWrappedFieldProps): any => {
  const {meta: {touched, error, submitFailed}} = field;
  const className = `form-group ${touched && error ? "has-danger" : ""}`;

  return (
    <div className={className}>
      <label>{field.label}</label>
      <input type={field.type} className="form-control" {...field.input} />
      <div className="form-text text-muted">
        {touched && submitFailed ? error : ""}
      </div>
    </div>
  );
};

const LabeledField = (props: any) => (
  <Field
    {...props}
    component={renderField as any}
  />
);

export default LabeledField;
