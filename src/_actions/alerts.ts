import { alertConstants } from './../_constants';
import { IAlertData } from './../_reducers/Alert/types';

export const alertActions = {
    success,
    error,
    clear
};

function success(alert:IAlertData) {
    return { type: alertConstants.SUCCESS, alert };
}

function error(alert:IAlertData) {
    return { type: alertConstants.ERROR, alert };
}

function clear() {
    return { type: alertConstants.CLEAR };
}