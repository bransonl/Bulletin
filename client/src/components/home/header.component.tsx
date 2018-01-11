import * as React from "react";

import {MdDashboard, MdSettings} from "react-icons/lib/md";

import {UserAction} from "../../state/actions/user.action";

interface HeaderProps {
  logout: () => UserAction;
}

const HeaderComponent: React.SFC<HeaderProps> = (props) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">Bulletin</a>
    <ul className="navbar-nav justify-content-end ml-auto">
      <div className="dropdown">
        <button
          type="button"
          className="btn btn-light"
          id="board-dropdown-button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <MdDashboard size={20} />
        </button>
        <div
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="board-dropdown-button"
        >
          <a className="dropdown-item" href="javascript:void(0)">Create board</a>
          <a className="dropdown-item" href="javascript:void(0)">Manage boards</a>
        </div>
      </div>
      <div className="dropdown show">
        <button
          type="button"
          className="btn btn-light"
          id="settings-dropdown-button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <MdSettings size={20} />
        </button>
        <div
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="settings-dropdown-button"
        >
          <a className="dropdown-item" href="javascript:void(0)">Account</a>
          <a className="dropdown-item" href="javascript:void(0)" onClick={props.logout}>Log Out</a>
        </div>
      </div>
    </ul>
  </nav>
);

export default HeaderComponent;
