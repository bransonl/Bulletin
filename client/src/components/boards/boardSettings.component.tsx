import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {InjectedFormProps, reduxForm} from "redux-form";

import {clearError, ErrorAction} from "../../state/error/error.action";
import {Config, PrivacyValuesConfig} from "../../types/config";
import {
  ConfigAction, fetchSingleConfig,
} from "../../state/config/config.action";
import {BoardAction, createBoard} from "../../state/board/board.action";
import LabeledField from "../shared/labeledField.component";
import {StringSelect} from "../shared/select.component";
import ErrorMessage from "../shared/error/errorMessage.component";
import {BoardInfo} from "../../types/board";

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
  createBoard: (boardInfo: BoardInfo) => BoardAction;
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
    const {handleSubmit, isLoading, pristine, privacyValues} = this.props;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    const privacyOptions = privacyValues && privacyValues.values;
    const privacyValue = privacyOptions && privacyOptions[1].value;
    return (
      <div className="container">
        <h1 className="page-title">Create Board</h1>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <LabeledField
            type="text"
            name="name"
            label="Name"
            description="Name to identify the board"
          />
          <LabeledField
            type="text"
            name="description"
            label="Description"
            description="Short description of the board"
          />
          <LabeledField
            name="privacy"
            label="Privacy Level"
            description="Privacy setting for the board"
            component={this.renderPrivacySelect}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={pristine}
          >
            Save
          </button>
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
    this.props.createBoard(values);
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
  {clearError, fetchSingleConfig, createBoard},
)(reduxForm<BoardSettingsFields>({
  form: "BoardSettingsForm",
  validate,
})(BoardSettingsComponent) as any);
