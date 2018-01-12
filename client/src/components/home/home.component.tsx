import * as React from "react";
import {connect} from "react-redux";

import {clearUser, UserAction} from "../../state/actions/user.action";
import HeaderComponent from "../shared/header.component";

interface PropsFromDispatch {
  clearUser: () => UserAction;
}

type HomeProps = PropsFromDispatch;

class HomeComponent extends React.Component<HomeProps, {}> {
  public render() {
    return (
      <div>
        <HeaderComponent logout={this.props.clearUser} />
      </div>
    );
  }
}

export default connect<null, PropsFromDispatch>(
  null,
  {clearUser}
)(HomeComponent);
