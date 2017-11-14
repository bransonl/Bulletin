import {ComponentType} from "react";

import {AuthRequirement} from "../router";

interface RouteInfo {
  path: string;
  component: ComponentType;
  authRequirement: AuthRequirement;
}

export {RouteInfo};
