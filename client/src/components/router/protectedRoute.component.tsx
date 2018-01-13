import * as React from "react";
import {RouteProps} from "react-router";
import {Redirect, Route} from "react-router-dom";

import {AuthRequirement} from "../../router";

interface ProtectedRouteProps extends RouteProps {
  authRequirement: AuthRequirement;
  isAuthenticated: boolean;
  component: React.ComponentType<any>;
}

function renderComponent(C: React.ComponentType<any>,
                         authRequirement: AuthRequirement,
                         isAuthenticated: boolean) {
  return (componentProps: any) => {
    switch (authRequirement) {
      case AuthRequirement.None:
        return <C {...componentProps} />;
      case AuthRequirement.Authenticated:
        if (isAuthenticated) {
          return <C {...componentProps} />;
        }
        return <Redirect to="/login"/>;
      case AuthRequirement.Unauthenticated:
        if (!isAuthenticated) {
          return <C {...componentProps} />;
        }
        return <Redirect to="/"/>;
    }
  };
}

const ProtectedRoute: React.SFC<ProtectedRouteProps> = (props: ProtectedRouteProps) => {
  const {authRequirement, isAuthenticated, component, ...rest} = props;
  return (
    <Route
      {...rest}
      render={renderComponent(component, authRequirement, isAuthenticated)}
    />
  );
};

export default ProtectedRoute;
