import { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { alertActions } from './_actions';
import { HomePageDashBoardContainer } from './_containers/DashBoard/HomePage';
import { UpdateDepositContainer } from './_containers/DashBoard/Deposit';
import { CreateIteamContainer } from './_containers/DashBoard/Item';

import { LoginContainer } from './_containers/Auth/Login';
import { RegisterContainer } from './_containers/Auth/Register';
import { RouteRedirectToLogin, RouteRedirectToDashBoard } from './_components/Router';
import { history } from './_helpers';
import { IAuthenticationData } from './_reducers/Authentication/types';
import { AppState } from './_reducers';

import './index.css';

function App() {
  const dispatch = useDispatch();
  const authentication: IAuthenticationData = useSelector((state: AppState) => state.authentication);


  useEffect(() => {
    history.listen(() => {
      dispatch(alertActions.clear());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div >
      <div className="spinner-border loading hide" id="loading"></div>

      <Router history={history}>
        <Switch>
          <RouteRedirectToDashBoard path='/' exact={true} component={LoginContainer} authentication={authentication} />
          <RouteRedirectToDashBoard path='/register' exact={true} component={RegisterContainer} authentication={authentication} />
          <Route path={'/dashboard/:path?'} >
            <Switch>
              <RouteRedirectToLogin path='/dashboard' exact={true} component={HomePageDashBoardContainer} authentication={authentication} />
              <RouteRedirectToLogin path='/dashboard/create-item' exact={true} component={CreateIteamContainer} authentication={authentication} />
              <RouteRedirectToLogin path='/dashboard/deposit' exact={true} component={UpdateDepositContainer} authentication={authentication} />
              <Redirect exact={true} from="*" to="/dashboard" />
            </Switch>
          </Route>
          <Redirect exact={true} from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
