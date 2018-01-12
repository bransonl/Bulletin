import {ComponentType} from "react";

import {AuthRequirement} from "../router";

interface RouteInfo {
  path: string;
  exact?: boolean;
  component: ComponentType;
  authRequirement: AuthRequirement;
}

export {RouteInfo};
