export interface IItemData {
    id: number;
    name: string;
    price: number;
    duration: number;
    end_at : Date,
}

export interface IItemDataCreate {
    name: string;
    price: number;
    duration: number;
}


export interface IDataBidItem {
    item_id: number;
    price: number;
}




