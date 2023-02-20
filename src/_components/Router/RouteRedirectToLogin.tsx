import { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Sidebar } from '../Sidebar';

function RouteRedirectToLogin({ component: Component, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return rest.authentication.isLogin ? (
          <Fragment>
            <div className="col-xs-12">
              <Sidebar />
              <Component {...props} />
            </div>
          </Fragment>
        ) : (
          <Redirect to="/" />
        );
      }}
    ></Route>
  );
}

export { RouteRedirectToLogin };