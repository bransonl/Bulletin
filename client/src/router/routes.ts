import {RouteInfo} from "./types/router";
import LandingComponent from "../landing/components/landing.component";
import HomeComponent from "../home/components/home.component";
import BoardsComponent from "../boards/components/boards.component";

// Top level routes
// Sub-routes are handled in each top-level route

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
    path: "/signup",
    component: LandingComponent,
    authRequirement: AuthRequirement.Unauthenticated,
  },
  {
    path: "/boards",
    component: BoardsComponent,
    authRequirement: AuthRequirement.Authenticated,
  },
  {
    path: "/",
    exact: true,
    component: HomeComponent,
    authRequirement: AuthRequirement.Authenticated,
  },
];

export {AuthRequirement};
export default routes;
