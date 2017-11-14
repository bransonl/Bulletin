import createHistory from "history/createBrowserHistory";

import {RouteInfo} from "../types/router";
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

const history = createHistory();

export {history, AuthRequirement, routes};
