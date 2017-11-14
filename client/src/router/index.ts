import * as React from "react";
import createHistory from "history/createBrowserHistory";
import LandingComponent from "../components/landing/landing.component";
import HomeComponent from "../components/home/home.component";

const enum AuthRequirement {
  None,
  Authenticated,
  Unauthenticated,
}

interface RouteInfo {
  path: string;
  component: React.ComponentType;
  authRequirement: AuthRequirement;
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

const history = createHistory();

export {history, AuthRequirement, RouteInfo, routes};
