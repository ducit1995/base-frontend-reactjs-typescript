import { userConstants } from './../../_constants';
import type { AnyAction } from 'redux';
import { IAuthenticationData } from './types';

var initialState: IAuthenticationData = {
    isLogin: false,
    token: ''
};
let authorizationLocalStorage: string | null = localStorage.getItem('Authorization');

if (authorizationLocalStorage) {
    initialState = {
        isLogin: true,
        token: authorizationLocalStorage
    }
}
const authentication = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case userConstants.LOGIN:
            return action.authenticationData;
        case userConstants.LOGOUT:
            return {
                ...state,
                isLogin: false,
            };
        default: return state;
    }
};

export { authentication };