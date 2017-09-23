import * as React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import HomeComponent from "../components/home/home.component";
import LandingComponent from "../components/landing/landing.component";

const routes = [{
  path: "/home",
  component: HomeComponent,
}, {
  path: "/register",
  component: LandingComponent,
}, {
  path: "/",
  component: LandingComponent,
}, ];

const routeComponents = routes.map((route) => (
  <Route key={route.path} path={route.path} component={route.component} />
));

const Router = () => (
  <BrowserRouter>
    <Switch>
      {routeComponents}
    </Switch>
  </BrowserRouter>
);

export default Router;
