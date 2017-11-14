import * as React from "react";
import {connect} from "react-redux";
import {Route} from "react-router";
import {Redirect, Switch} from "react-router-dom";
import {ConnectedRouter} from "react-router-redux";

import {AuthRequirement, history, routes} from "../../router";
import {UserToken} from "../../types/user";
import {RouteInfo} from "../../types/router";
import ProtectedRoute from "./protectedRoute.component";

interface PropsFromState {
  isAuthenticated: boolean;
}

function renderRoute(isAuthenticated: boolean) {
  return function({path, component, authRequirement}: RouteInfo) {
    if (authRequirement !== AuthRequirement.None) {
      return (
        <ProtectedRoute
          key={path}
          exact
          path={path}
          authRequirement={authRequirement}
          isAuthenticated={isAuthenticated}
          component={component}
        />
      );
    }
    return <Route key={path} exact path={path} component={component} />;
  };
}

const Router: React.SFC<PropsFromState> = ({isAuthenticated}) => (
  <ConnectedRouter history={history}>
    <Switch>
      {routes.map(renderRoute(isAuthenticated))}
      <Route path="/*" render={() => <Redirect to="/" />} />
    </Switch>
  </ConnectedRouter>
);

function mapStateToProps ({user}: {user: UserToken | null}) {
  return {isAuthenticated: user !== null}
}

export default connect<PropsFromState, null>(mapStateToProps, null)(Router);
