import * as React from "react";

import { Options } from "../../types/select.d";

interface SelectProps<T> extends React.HTMLProps<HTMLSelectElement> {
  options: Options<T>;
}

const renderOptions = (options: Options<any>) => (
  options.map(({label, value}) => (
    <option key={value} value={value}>{label}</option>
  ))
);

class Select<T> extends React.Component<SelectProps<T>> {
  public render() {
    const {options, ...rest} = this.props;
    return (
      <select {...rest}>
        <option value={""}>Select an option...</option>
        {options && renderOptions(options)}
      </select>
    );
  }
}

type StringSelect = new () => Select<string>;
const StringSelect = Select as StringSelect;

export default Select;
export {
  StringSelect,
};
