import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../../_actions';
import { userConstants } from '../../../_constants';
import { Alert } from '../../../_components/Alert';
import { IAlertData } from '../../../_reducers/Alert/types';
import { Link } from 'react-router-dom';

function UpdateDepositContainer() {

    const alert: IAlertData = useSelector((state: any) => state.alert);
    const dispatch = useDispatch();

    const [amount, setAmount] = useState(0);

    const handleChangeDeposit = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setAmount(Number(value));
    }

    function handleSubmit() {
        if (validateParam()) {
            dispatch(userActions.updateDeposit({ amount }));
        }
    }

    function validateParam() {
        return (amount > 0) ? true : false;
    }

    return (
        <div className="container  mt-3">
            {alert.message && alert.screen.includes(userConstants.SCREEN_UPDATE_DEPOSIT) && <Alert alert={alert} />}
            <div className="form-group  mt-3">
                <label htmlFor="exampleInputEmail1">Amout</label>
                <input type="number" className="form-control  mt-3" onChange={handleChangeDeposit} name='deposit' />
            </div>
            <div className="col-xs-12 text-center mt-3">
                <Link to={'/dashboard'}>
                    <button type="submit" className={'btn m-3 btn-secondary'}>Cancel</button>
                </Link>
                <button type="submit" className={'btn m-3 ' + (!validateParam() ? 'btn-secondary' : 'btn-primary')} onClick={() => { handleSubmit() }}>Deposit</button>
            </div>

        </div>
    );
}


export { UpdateDepositContainer };

