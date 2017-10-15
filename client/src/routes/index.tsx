import * as React from "react";
import {Route, Switch} from "react-router-dom";
import {ConnectedRouter} from "react-router-redux";
import createHistory from "history/createBrowserHistory";

import HomeComponent from "../components/home/home.component";
import LandingComponent from "../components/landing/landing.component";

interface RouteInfo {
  path: string;
  component: React.ComponentType;
  requiresAuth: boolean;
}

const routes: {[routeName: string]: RouteInfo} = {
  "/home": {
    path: "/home",
    component: HomeComponent,
    requiresAuth: true,
  },
  "/register": {
    path: "/register",
    component: LandingComponent,
    requiresAuth: false,
  },
  "/": {
    path: "/",
    component: LandingComponent,
    requiresAuth: false,
  },
};

const history = createHistory();

const routeComponents = Object.keys(routes).map((route) => (
  <Route key={routes[route].path} path={routes[route].path} component={routes[route].component}/>
));

const Router = () => (
  <ConnectedRouter history={history}>
    <Switch>
      {routeComponents}
    </Switch>
  </ConnectedRouter>
);

export {history, routes};
export default Router;
