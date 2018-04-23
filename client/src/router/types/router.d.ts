import {ComponentType} from "react";

import {AuthRequirement} from "../routes";

interface RouteInfo {
  path: string;
  exact?: boolean;
  component: ComponentType;
  authRequirement: AuthRequirement;
}

export {RouteInfo};
