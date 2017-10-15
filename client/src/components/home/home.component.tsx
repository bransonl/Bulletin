import * as React from "react";
import {connect} from "react-redux";

import HeaderComponent from "./header.component";

class HomeComponent extends React.Component {
  public render() {
    return (
      <div>
        <HeaderComponent />
      </div>
    );
  }
}

export default HomeComponent;
