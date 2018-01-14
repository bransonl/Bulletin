import * as React from "react";
import {connect} from "react-redux";

import "./boardSettings.component.scss";

const BoardSettingsComponent: React.SFC<{}> = (props) => (
  <div className="container">
    <h1 className="page-title">Create Board</h1>
    <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          aria-describedby="name-hint"
        />
        <small id="name-hint" className="form-text text-muted">
          Name to identify the Board
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          className="form-control"
          aria-describedby="description-hint"
        />
        <small id="description-hint" className="form-text text-muted">
          Short description of the Board
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="privacy">Privacy Level</label>
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  </div>
);

export default BoardSettingsComponent;
