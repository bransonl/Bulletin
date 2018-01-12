import * as React from "react";
import {RouteProps} from "react-router";
import {Redirect, Route} from "react-router-dom";

import {AuthRequirement} from "../../router";

interface ProtectedRouteProps extends RouteProps {
  authRequirement: AuthRequirement,
  isAuthenticated: boolean,
  component: React.ComponentType<any>,
}

const ProtectedRoute: React.SFC<ProtectedRouteProps> = (props: ProtectedRouteProps) => {
  const {authRequirement, isAuthenticated, component: C, ...rest} = props;
  return (
    <Route
      {...rest}
      render={(props) => {
        switch(authRequirement) {
          case AuthRequirement.None:
            return <C {...rest} />;
          case AuthRequirement.Authenticated:
            if (isAuthenticated) {
              return <C {...rest} />;
            }
            return <Redirect to="/login" />;
          case AuthRequirement.Unauthenticated:
            if (!isAuthenticated) {
              return <C {...rest} />;
            }
            return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
