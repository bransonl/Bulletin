import * as React from "react";
import {connect} from "react-redux";
import {Route} from "react-router";
import {Redirect, Switch} from "react-router-dom";
import {ConnectedRouter} from "react-router-redux";

import history from "./history";
import {UserToken} from "../types/user";
import {RouteInfo} from "../types/router";
import ProtectedRoute from "../components/router/protectedRoute.component";
import LandingComponent from "../components/landing/landing.component";
import HomeComponent from "../components/home/home.component";


const enum AuthRequirement {
  None,
  Authenticated,
  Unauthenticated,
}

const routes: RouteInfo[] = [
  {
    path: "/login",
    component: LandingComponent,
    authRequirement: AuthRequirement.Unauthenticated,
  },
  {
    path: "/register",
    component: LandingComponent,
    authRequirement: AuthRequirement.Unauthenticated,
  },
  {
    path: "/",
    component: HomeComponent,
    authRequirement: AuthRequirement.Authenticated,
  }
];

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

class Router extends React.Component<PropsFromState, {}> {
  public render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          {routes.map(renderRoute(this.props.isAuthenticated))}
          <Route path="/*" render={() => <Redirect to="/" />} />
        </Switch>
      </ConnectedRouter>
    )
  }
}

function mapStateToProps ({user}: {user: UserToken | null}) {
  return {isAuthenticated: user !== null}
}

export {AuthRequirement};
export default connect<PropsFromState, null>(mapStateToProps, null)(Router);
