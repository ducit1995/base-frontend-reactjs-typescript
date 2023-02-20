import { alertConstants } from './../../_constants';
import { isEmpty } from 'lodash';
import { IAlertData } from './types';

import type { AnyAction } from 'redux';

var initialState: IAlertData = {
    type: '',
    screen: [],
    message: '',
};



export function alert(state = initialState, action: AnyAction) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: alertConstants.SUCCESS,
                screen: !isEmpty(action.alert.screen) ? action.alert.screen : [],
                message: action.alert.message
            };
        case alertConstants.ERROR:
            return {
                type: alertConstants.ERROR,
                screen: !isEmpty(action.alert.screen) ? action.alert.screen : [],
                message: action.alert.message
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state;
    }
}