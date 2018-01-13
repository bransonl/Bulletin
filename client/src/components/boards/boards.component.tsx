import * as React from "react";
import {connect} from "react-redux";
import {Route, RouteComponentProps} from "react-router-dom";

import {clearUser, UserAction} from "../../state/actions/user.action";
import HeaderComponent from "../shared/header.component";

interface PropsFromDispatch {
  clearUser: () => UserAction;
}

type BoardsProps = PropsFromDispatch & RouteComponentProps<null>;

const BoardsComponent: React.SFC<BoardsProps> = ({clearUser, match}) => {
  return (
    <div>
      <HeaderComponent logout={clearUser} />
    </div>
  );
};

export default connect<null, PropsFromDispatch>(
  null,
  {clearUser}
)(BoardsComponent);
