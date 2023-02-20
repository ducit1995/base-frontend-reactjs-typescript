import { apiCaller } from './../_helpers';
import { alertActions } from './';
import { itemConstants } from './../_constants';
import { history } from '../_helpers';
import { IItemDataCreate, IDataBidItem } from '../_reducers/Item/types';


const getAllItems = () => {
    return (dispatch: any) => {
        return apiCaller('/v1/items', 'GET').then(
            (data) => {
                dispatch({
                    type: itemConstants.GET_LIST_ITEM,
                    data: data.data
                });
            },
            error => {
                dispatch(alertActions.error({ 'message': error.toString(), 'screen': [itemConstants.GET_LIST_ITEM] }));
            }
        );
    };
}

const getOngoingItems = () => {
    return (dispatch: any) => {
        return apiCaller('/v1/items/ongoing', 'GET').then(
            (data) => {
                dispatch({
                    type: itemConstants.GET_LIST_ITEM,
                    data: data.data
                });
            },
            error => {
                dispatch(alertActions.error({ 'message': error.toString(), 'screen': [itemConstants.GET_LIST_ITEM] }));
            }
        );
    };
}

const getOncompletedItems = () => {
    return (dispatch: any) => {
        return apiCaller('/v1/items/completed', 'GET').then(
            (data) => {
                dispatch({
                    type: itemConstants.GET_LIST_ITEM,
                    data: data.data
                });
            },
            error => {
                dispatch(alertActions.error({ 'message': error.toString(), 'screen': [itemConstants.GET_LIST_ITEM] }));
            }
        );
    };
}


const createItem = (data: IItemDataCreate) => {
    return (dispatch: any) => {
        dispatch(alertActions.clear());
        return apiCaller('/v1/items/create', 'POST', data, {}, false).then(
            () => {
                history.push('/dashboard');
            },
            (error) => {
                dispatch(alertActions.error({ 'message': error.toString(), 'screen': [itemConstants.SCREEN_CREATE_ITEM] }));
            }
        );
    };
}


const submitBid = (data: IDataBidItem) => {
    return (dispatch: any) => {
        dispatch(alertActions.clear());
        return apiCaller('/v1/items/bid', 'POST', data).then(
            (data) => {
                dispatch(alertActions.success({ 'message': data.message, 'screen': [itemConstants.SCREEN_BID_ITEM] }));
            },
            error => {
                dispatch(alertActions.error({ 'message': error.toString(), 'screen': [itemConstants.SCREEN_BID_ITEM] }));
            }
        );
    };
}

export const itemActions = {
    getAllItems,
    getOngoingItems,
    getOncompletedItems,
    createItem,
    submitBid
};
