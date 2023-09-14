import { ComponentType } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import { FullPageLoading } from "../Loading/index";

export const AuthenticationGuard = ({
  component,
}: {
  component: ComponentType;
}) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => {
      return (
        <div className="page-layout">
          <FullPageLoading />
        </div>
      );
    },
    returnTo: "/",
  });

  return <Component />;
};
