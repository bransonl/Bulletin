import * as React from "react";
import {connect} from "react-redux";
import {Route, RouteComponentProps} from "react-router-dom";

import {clearUser, UserAction} from "../../shared/state/user.action";
import HeaderComponent from "../../shared/components/header.component";
import BoardSettingsComponent from "./boardSettings.component";

interface PropsFromDispatch {
  clearUser: () => UserAction;
}

type BoardsProps = PropsFromDispatch & RouteComponentProps<null>;

const BoardsComponent: React.SFC<BoardsProps> = ({clearUser: logout, match}) => {
  return (
    <div>
      <HeaderComponent logout={logout} />
      <Route path={`${match.url}/create`} component={BoardSettingsComponent} />
    </div>
  );
};

export default connect<null, PropsFromDispatch>(
  null,
  {clearUser},
)(BoardsComponent);
