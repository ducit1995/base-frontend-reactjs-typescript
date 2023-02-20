import { userConstants } from './../../_constants';
import type { AnyAction } from 'redux';
import { IUserInfoData } from './types';

var initialState: IUserInfoData = {
    id: 0,
    email: '',
    deposit: 0,
};

const userInfo = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case userConstants.ADD_USER_INFO:
            return action.data;
        case userConstants.CLEAR_USER_INFO:
            return {
                ...state,
                isLogin: false,
            };
        default: return state;
    }
};

export { userInfo };