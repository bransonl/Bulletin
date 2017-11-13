import * as React from "react";
import {RouteProps} from "react-router";
import {Redirect, Route} from "react-router-dom";

import {AuthRequirement} from "../../routes/index";

interface ProtectedRouteProps extends RouteProps {
  authRequirement: AuthRequirement,
  isAuthenticated: boolean,
  component: React.ComponentType,
  componentProps?: any
}

const authenticatedRoute: React.SFC<ProtectedRouteProps> = (props: ProtectedRouteProps) => {
  const {authRequirement, isAuthenticated, component: C, componentProps, ...rest} = props;
  return (
    <Route
      {...rest}
      render={(props) => {
        switch(authRequirement) {
          case AuthRequirement.None:
            return <C {...props} {...componentProps} />;
          case AuthRequirement.Authenticated:
            if (isAuthenticated) {
              return <C {...props} {...componentProps} />;
            }
            return <Redirect to="/login" />;
          case AuthRequirement.Unauthenticated:
            if (!isAuthenticated) {
              return <C {...props} {...componentProps} />;
            }
            return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default authenticatedRoute;
