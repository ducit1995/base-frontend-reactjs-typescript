
import { Route, Redirect } from 'react-router-dom';
function RouteRedirectToDashBoard({ component: Component, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return !rest.authentication.isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        );
      }}
    ></Route>
  );
}
export { RouteRedirectToDashBoard };