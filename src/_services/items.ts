import { apiCaller } from './../_helpers';
import { IDataBidItem } from '../_reducers/Item/types';

const submitBid = (data: IDataBidItem) => {
    return apiCaller('/v1/items/bid', 'POST', data);
}

export const itemService = {
    submitBid
};


