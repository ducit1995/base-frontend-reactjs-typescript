import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../../_actions';
import { userConstants } from '../../../_constants';
import { Alert } from '../../../_components/Alert';
import { IAlertData } from '../../../_reducers/Alert/types';
import { Link } from 'react-router-dom';

function LoginContainer() {

    const alert: IAlertData = useSelector((state: any) => state.alert);
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const { email, password } = inputs;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }
    function handleSubmit() {
        if (validateParam()) {
            dispatch(userActions.login(inputs));
        }
    }

    function validateParam() {
        return (email && password) ? true : false;
    }

    return (
        <div className="container  mt-3">
            <h2>Login</h2>
            {alert.message && alert.screen.includes(userConstants.SCREEN_LOGIN) && <Alert alert={alert} />}

            <div className="form-group  mt-3">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input type="email" className="form-control  mt-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange} name='email' />
            </div>
            <div className="form-group mt-3">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control  mt-3" id="exampleInputPassword1" placeholder="Password" onChange={handleChange} name='password' />
            </div>
            <div className="col-xs-12 text-center mt-3">
                <button type="submit" className={'btn mt-3 ' + (!validateParam() ? 'btn-secondary' : 'btn-primary')} onClick={() => { handleSubmit() }}>Login</button>
            </div>
            <div className="col-xs-12 text-center mt-3">
                <Link to={'/register'}>Register</Link>
            </div>
        </div>
    );
}


export { LoginContainer };

