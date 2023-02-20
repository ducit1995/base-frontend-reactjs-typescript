import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { itemActions } from '../../../_actions';
import { itemConstants } from '../../../_constants';
import { Alert } from '../../../_components/Alert';
import { IAlertData } from '../../../_reducers/Alert/types';
import { Link } from 'react-router-dom';

function CreateIteamContainer() {

    const alert: IAlertData = useSelector((state: any) => state.alert);
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        name: '',
        price: 0,
        duration: 0
    });

    const { name, price, duration } = inputs;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.currentTarget;
        const value = e.target.type === "number" && !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : e.target.value
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit() {
        if (validateParam()) {
            dispatch(itemActions.createItem(inputs));
        }
    }

    function validateParam() {
        return (name && duration && price) ? true : false;
    }

    return (
        <div className="container  mt-3">
            {alert.message && alert.screen.includes(itemConstants.SCREEN_CREATE_ITEM) && <Alert alert={alert} />}
            <div className="form-group  mt-3">
                <label htmlFor="exampleInputEmail1">Name</label>
                <input type="text" className="form-control  mt-3" onChange={handleChange} name='name' />
            </div>
            <div className="form-group  mt-3">
                <label htmlFor="exampleInputEmail1">Start price</label>
                <input type="number" className="form-control  mt-3" onChange={handleChange} name='price' />
            </div>
            <div className="form-group  mt-3">
                <label htmlFor="exampleInputEmail1">Time Window ( seconds ) </label>
                <input type="number" className="form-control  mt-3" onChange={handleChange} name='duration' />
            </div>
            <div className="col-xs-12 text-center mt-3">
                <Link to={'/dashboard'}>
                    <button type="submit" className={'btn m-3 btn-secondary'}>Cancel</button>
                </Link>
                <button type="submit" className={'btn m-3 ' + (!validateParam() ? 'btn-secondary' : 'btn-primary')} onClick={() => { handleSubmit() }}>Create</button>
            </div>

        </div>
    );
}


export { CreateIteamContainer };

