import * as React from "react";
import {connect} from "react-redux";
import {Route} from "react-router";
import {Redirect, Switch} from "react-router-dom";
import {ConnectedRouter} from "react-router-redux";

import history from "../history";
import {UserToken} from "../../shared/types/user";
import {RouteInfo} from "../types/router";
import routes, {AuthRequirement} from "../routes";
import ProtectedRoute from "./protectedRoute.component";

interface PropsFromState {
  isAuthenticated: boolean;
}

function renderRoute(isAuthenticated: boolean) {
  return ({path, exact = false, component, authRequirement}: RouteInfo) => {
    if (authRequirement !== AuthRequirement.None) {
      return (
        <ProtectedRoute
          key={path}
          path={path}
          exact={exact}
          authRequirement={authRequirement}
          isAuthenticated={isAuthenticated}
          component={component}
        />
      );
    }
    return <Route key={path} path={path} exact={exact} component={component} />;
  };
}

const redirect = () => <Redirect to="/" />;

class Router extends React.Component<PropsFromState, {}> {
  public render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          {routes.map(renderRoute(this.props.isAuthenticated))}
          <Route path="/*" render={redirect} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

function mapStateToProps({user}: {user: UserToken | null}) {
  return {isAuthenticated: user !== null};
}

export {AuthRequirement};
export default connect<PropsFromState, null>(mapStateToProps, null)(Router);
