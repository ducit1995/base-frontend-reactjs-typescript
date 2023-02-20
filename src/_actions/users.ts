import { apiCaller } from './../_helpers';
import { alertActions } from './';
import { userConstants } from './../_constants';
import { history } from '../_helpers';
import { IDataLogin } from '../_containers/Auth/Login/type';
import { IAuthenticationData } from '../_reducers/Authentication/types';
import { IDataUpdateDeposit } from '../_containers/DashBoard/Deposit/types';

const login = (data: IDataLogin) => {
    return (dispatch: any) => {
        dispatch(alertActions.clear());
        return apiCaller('/v1/auth/login', 'POST', data, {}, false).then(
            (data) => {
                let authenticationData:IAuthenticationData = {
                    isLogin: false,
                    token: null
                };
                authenticationData.isLogin = true;
                authenticationData.token = data.data;
                localStorage.setItem('Authorization',  data.data);
                dispatch({
                    type: userConstants.LOGIN,
                    authenticationData
                });
                history.push('/dashboard');
            },
            error => {
                dispatch(alertActions.error({ 'message': error.toString(), 'screen': [userConstants.SCREEN_LOGIN] }));
            }
        );
    };
}

const register = (data: IDataLogin) => {
    return (dispatch: any) => {
        dispatch(alertActions.clear());
        return apiCaller('/v1/auth/register', 'POST', data, {}, false).then(
            (data) => {
                dispatch(alertActions.success({ 'message': data.message, 'screen': [userConstants.SCREEN_REGISTER] }));
            },
            error => {
                dispatch(alertActions.error({ 'message': error.toString(), 'screen': [userConstants.SCREEN_REGISTER] }));
            }
        );
    };
}

const getUserInfo = () => {
    return (dispatch: any) => {
        dispatch(alertActions.clear());
        return apiCaller('/v1/users/info', 'GET').then(
            (data) => {
                dispatch({
                    type: userConstants.ADD_USER_INFO,
                    data : data.data
                });
            },
            error => {
                dispatch(alertActions.error({ 'message': error.toString(), 'screen': [userConstants.ADD_USER_INFO] }));
            }
        );
    };
}

const updateDeposit = (data: IDataUpdateDeposit) => {
    return (dispatch: any) => {
        dispatch(alertActions.clear());
        return apiCaller('/v1/users/deposit', 'POST', data, {}, false).then(
            (data) => {
                dispatch(getUserInfo());
                dispatch(alertActions.success({ 'message': data.message, 'screen': [userConstants.SCREEN_UPDATE_DEPOSIT] }));
            },
            error => {
                dispatch(alertActions.error({ 'message': error.toString(), 'screen': [userConstants.SCREEN_UPDATE_DEPOSIT] }));
            }
        );
    };
}

export const userActions = {
    login,
    register,
    getUserInfo,
    updateDeposit
};
