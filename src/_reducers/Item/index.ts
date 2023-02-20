import { itemConstants } from './../../_constants';
import type { AnyAction } from 'redux';
import { IItemData } from './types';

var initialState: Array<IItemData> = [];

const listItem = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case itemConstants.GET_LIST_ITEM:
            return action.data;
        default: return state;
    }
};

export { listItem };