import * as React from "react";
import {Route, Switch} from "react-router-dom";
import {ConnectedRouter} from "react-router-redux";
import {connect} from "react-redux";
import createHistory from "history/createBrowserHistory";

import AuthenticatedRoute from "../components/routing/protectedRoute.component";
import HomeComponent from "../components/home/home.component";
import LandingComponent from "../components/landing/landing.component";
import {UserToken} from "../state/types/user.type";
import {Redirect} from "react-router";

enum AuthRequirement {
  None,
  Authenticated,
  Unauthenticated,
}

interface RouteInfo {
  path: string;
  component: React.ComponentType;
  authRequirement: AuthRequirement;
}

interface PropsFromState {
  user: UserToken | null;
}

const routes: {[routeName: string]: RouteInfo} = {
  login: {
    path: "/login",
    component: LandingComponent,
    authRequirement: AuthRequirement.Unauthenticated,
  },
  register: {
    path: "/register",
    component: LandingComponent,
    authRequirement: AuthRequirement.Unauthenticated,
  },
  home: {
    path: "/",
    component: HomeComponent,
    authRequirement: AuthRequirement.Authenticated,
  }
};

const history = createHistory();

const routeComponents = (isAuthenticated: boolean) => {
  return Object.keys(routes).map((route) => {
    const {path, component, authRequirement} = routes[route];
    if (authRequirement !== AuthRequirement.None) {
      return <AuthenticatedRoute
        key={path}
        exact
        path={path}
        component={component}
        authRequirement={authRequirement}
        isAuthenticated={isAuthenticated} />;
    }
    return <Route key={path} exact path={path} component={component} />;
  });
};

const Router: React.SFC<PropsFromState> = ({user}) => (
  <ConnectedRouter history={history}>
    <Switch>
      {routeComponents(user !== null)}
      <Route path="/*" render={() => <Redirect to="/" />} />
    </Switch>
  </ConnectedRouter>
);

const mapStateToProps = ({user}: {user: UserToken | null}) => ({user});

export {AuthRequirement, history, routes};
export default connect<PropsFromState, null>(mapStateToProps, null)(Router);
