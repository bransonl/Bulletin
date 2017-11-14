import {ComponentType} from "react";
import {AuthRequirement} from "../router/index";

interface RouteInfo {
  path: string;
  component: ComponentType;
  authRequirement: AuthRequirement;
}

export {RouteInfo};
