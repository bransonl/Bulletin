import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {InjectedFormProps, reduxForm} from "redux-form";

import {clearError, ErrorAction} from "../../state/actions/error.action";
import {Config, PrivacyValuesConfig} from "../../types/config";
import {
  ConfigAction, fetchSingleConfig,
} from "../../state/actions/config.action";
import LabeledField from "../shared/labeledField.component";
import { StringSelect } from "../shared/select.component";

import "./boardSettings.component.scss";

const enum BoardSettingsError {
  MISSING_NAME = "Please enter a name for the board.",
  MISSING_DESCRIPTION = "Please enter a description for the board.",
  MISSING_PRIVACY = "Please select a privacy setting.",
}

interface BoardSettingsFields {
  name: string;
  description: string;
  privacy: string;
}

interface BoardSettingsErrors {
  name?: string;
  description?: string;
  privacy?: string;
}

interface PropsFromState {
  isLoading: boolean;
  privacyValues: PrivacyValuesConfig;
}

interface PropsFromDispatch {
  clearError: () => ErrorAction;
  fetchSingleConfig: (configName: string) => ConfigAction;
}

type BoardSettingsProps =
  InjectedFormProps<BoardSettingsFields>
  & PropsFromState
  & PropsFromDispatch;

class BoardSettingsComponent extends React.Component<BoardSettingsProps, {}> {
  constructor(props: BoardSettingsProps) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderPrivacySelect = this.renderPrivacySelect.bind(this);
  }

  public componentDidMount() {
    this.props.fetchSingleConfig("privacy");
  }

  public render() {
    if (this.props.isLoading) {
      return <div>Loading...</div>;
    }
    const privacyOptions = this.props.privacyValues && this.props.privacyValues.values;
    const privacyValue = privacyOptions && privacyOptions[1].value;
    return (
      <div className="container">
        <h1 className="page-title">Create Board</h1>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <LabeledField
            type="text"
            name="board-name"
            label="Name"
            description="Name to identify the board"
          />
          <LabeledField
            type="text"
            name="board-description"
            label="Description"
            description="Short description of the board"
          />
          <LabeledField
            name="board-privacy"
            label="Privacy Level"
            description="Privacy setting for the board"
            component={this.renderPrivacySelect}
            value={privacyValue}
          />
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    );
  }

  private renderPrivacySelect(props: any) {
    const options = this.props.privacyValues
      && this.props.privacyValues.values;
    return (
      <StringSelect
        {...props}
        name="board-privacy"
        id="privacy"
        className="form-control"
        options={options}
      />
    );
  }

  private onSubmit(values: BoardSettingsFields) {
    this.props.clearError();
  }
}

function validate(fields: BoardSettingsFields): BoardSettingsErrors {
  const errors: BoardSettingsErrors = {};

  if (!fields.name) {
    errors.name = BoardSettingsError.MISSING_NAME;
  }
  if (!fields.description) {
    errors.description = BoardSettingsError.MISSING_DESCRIPTION;
  }
  if (!fields.privacy) {
    errors.privacy = BoardSettingsError.MISSING_PRIVACY;
  }

  return errors;
}

function mapStateToProps({config, isLoading}: {config: Config, isLoading: boolean}): PropsFromState {
  return {privacyValues: (config && config.privacy) || null, isLoading};
}

export default connect<PropsFromState, PropsFromDispatch>(
  mapStateToProps,
  {clearError, fetchSingleConfig},
)(reduxForm<BoardSettingsFields>({
  form: "BoardSettingsForm",
  validate,
})(BoardSettingsComponent) as any);
