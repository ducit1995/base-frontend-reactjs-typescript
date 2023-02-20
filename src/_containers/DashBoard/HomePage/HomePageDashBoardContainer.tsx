import { useEffect, useState } from 'react';
import { itemActions, alertActions, userActions } from './../../../_actions';
import { itemService } from './../../../_services';
import { useSelector, useDispatch } from 'react-redux';
import { IItemData } from './../../../_reducers/Item/types';
import { AppState } from './../../../_reducers';
import { itemConstants } from './../../../_constants';
import { IAlertData } from '../../../_reducers/Alert/types';
import { Alert } from '../../../_components/Alert';

function HomePageDashBoardContainer() {
    const dispatch = useDispatch();
    const listItem: Array<IItemData> = useSelector((state: AppState) => state.listItem);
    const [currentTab, setCurrentTab] = useState(1);
    const [showBid, setShowBid] = useState(false);
    const alert: IAlertData = useSelector((state: AppState) => state.alert);

    const [dataBidItem, setIDataBidItem] = useState({
        name: "",
        item_id: 0,
        price: 0,
    });

    const getAllItems = () => {
        setCurrentTab(1)
    }

    const getOngoingItems = () => {
        setCurrentTab(2)
    }

    const getOncompletedItems = () => {
        setCurrentTab(3)
    }

    useEffect(() => {
        getListItemsByTab();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTab]);

    const getListItemsByTab = () => {
        if (currentTab === 1) {
            dispatch(itemActions.getAllItems());
        } else if (currentTab === 2) {
            dispatch(itemActions.getOngoingItems());
        } else {
            dispatch(itemActions.getOncompletedItems());
        }
    }
    const bidItem = (data: IItemData) => {
        if (data.id) {
            setIDataBidItem({
                name: data.name,
                item_id: data.id,
                price: data.price,
            });
            setShowBid(true);
        }
    }

    function validateParam() {
        return (dataBidItem.price) ? true : false;
    }

    const submitBid = () => {
        if (validateParam()) {
            dispatch(alertActions.clear());
            itemService.submitBid({
                item_id: dataBidItem.item_id,
                price: dataBidItem.price,
            }).then(
                async (data) => {
                    await getListItemsByTab();
                    await dispatch(userActions.getUserInfo());
                    await dispatch(alertActions.success({ 'message': data.message, 'screen': [itemConstants.SCREEN_BID_ITEM] }));
                },
                error => {
                    dispatch(alertActions.error({ 'message': error.toString(), 'screen': [itemConstants.SCREEN_BID_ITEM] }));
                }
            );
        }

    }

    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setIDataBidItem({
            ...dataBidItem,
            price: Number(value),
        });
    }


    return (
        <div className="container mt-3">
            <div className="col-xs-12">
                <button type="button" className={"btn m-3 " + (currentTab === 1 ? 'btn-primary' : 'btn-secondary')} onClick={() => { getAllItems() }}>All</button>
                <button type="button" className={"btn m-3 " + (currentTab === 2 ? 'btn-primary' : 'btn-secondary')} onClick={() => { getOngoingItems() }}>Ongoing</button>
                <button type="button" className={"btn m-3 " + (currentTab === 3 ? 'btn-primary' : 'btn-secondary')} onClick={() => { getOncompletedItems() }}>Oncompleted</button>
            </div>
            <div className="col-xs-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Current Price</th>
                            <th scope="col">Duration ( seconds )</th>
                            <th scope="col">Completed At</th>
                            <th scope="col">Bid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItem.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row">{data.name}</th>
                                    <td>{data.price}$</td>
                                    <td>{data.duration}</td>
                                    <td>{new Date(data.end_at).toString()}</td>
                                    {(new Date().getTime() < new Date(data.end_at).getTime()) && <td>
                                        <button type="button" className="btn btn-secondary" onClick={() => { bidItem(data) }}>
                                            Bid
                                        </button>
                                    </td>}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {showBid && <div className="modal fade show" >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{dataBidItem.name}</h5>
                            <button type="button" className="close" onClick={() => { setShowBid(false); }}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        {alert.message && alert.screen.includes(itemConstants.SCREEN_BID_ITEM) && <Alert alert={alert} />}

                        <div className="modal-body">
                            <div className="form-group  mt-3">
                                <label>Bid price</label>
                                <input type="number" className="form-control  mt-3" name='price' value={dataBidItem.price} onChange={handleChangePrice} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { setShowBid(false); }}>Close</button>
                            <button type="button" className={"btn " + (!validateParam() ? 'btn-secondary' : 'btn-primary')} onClick={() => { submitBid() }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}


export { HomePageDashBoardContainer };

