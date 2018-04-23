import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {InjectedFormProps, reduxForm} from "redux-form";

import {RootState} from "../../rootState";
import {clearError, ErrorAction} from "../../error/state/error.action";
import {Config, PrivacyValuesConfig} from "../../shared/types/config";
import {
  ConfigAction, fetchSingleConfig,
} from "../../shared/state/config.action";
import {BoardAction, createBoard} from "../state/board.action";
import LabeledField from "../../shared/components/labeledField.component";
import {StringSelect} from "../../shared/components/select.component";
import ErrorMessage from "../../error/components/errorMessage.component";
import {Board, BoardInfo} from "../types/board";

import "./boardSettings.component.scss";

const enum BoardSettingsError {
  MissingName = "Please enter a name for the board.",
  MissingDescription = "Please enter a description for the board.",
  MissingPrivacy = "Please select a privacy setting.",
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
  activeBoard: Board;
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
      return (
        <div className="container">
          <h1 className="page-title">Loading...</h1>
        </div>
      );
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
    errors.name = BoardSettingsError.MissingName;
  }
  if (!fields.description) {
    errors.description = BoardSettingsError.MissingDescription;
  }
  if (!fields.privacy) {
    errors.privacy = BoardSettingsError.MissingPrivacy;
  }

  return errors;
}

function mapStateToProps(state: RootState): PropsFromState {
  return {
    isLoading: state.isLoading,
    privacyValues: (state.config && state.config.privacy) || null,
    activeBoard: state.activeBoard,
  };
}

export default connect<PropsFromState, PropsFromDispatch>(
  mapStateToProps,
  {clearError, fetchSingleConfig, createBoard},
)(reduxForm<BoardSettingsFields>({
  form: "BoardSettingsForm",
  validate,
})(BoardSettingsComponent) as any);
