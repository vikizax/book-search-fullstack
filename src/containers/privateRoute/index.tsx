import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";

interface IPrivateRouteProps {
  component: ComponentType<object>;
  [key: string]: any;
}

export const ProtectedRoute = ({ component, ...props }: IPrivateRouteProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <>User is not Signed in redirecting to Sign in .....</>
    ),
  });

  return <Component {...props} />;
};
