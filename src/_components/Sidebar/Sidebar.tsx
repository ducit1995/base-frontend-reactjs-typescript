import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userActions } from './../../_actions';
import { useSelector, useDispatch } from 'react-redux';
import { IUserInfoData } from './../../_reducers/User/types';
import { AppState } from './../../_reducers';
import { clearStorage } from './../../_helpers';

function Sidebar() {
    const dispatch = useDispatch();
    const userInfo: IUserInfoData = useSelector((state: AppState) => state.userInfo);

    useEffect(() => {
        dispatch(userActions.getUserInfo());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = () => {
        clearStorage();

    }

    return (
        <div className="navbar navbar-expand-lg navbar-light bg-light p-3">
            <Link className="dropdown-item" to={'/dashboard'}>Jitera</Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <form className="d-flex">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                        <p className="nav-link dropdown-toggle"  >
                            Balance : {userInfo.deposit}$
                        </p>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to={'/dashboard/create-item'}>Create New Item</Link>
                            <Link className="dropdown-item" to={'/dashboard/deposit'}>Deposit</Link>
                            <p className="dropdown-item" onClick={() => { logout() }}>Logout</p>
                        </div>
                    </li>

                </ul>
            </form>
        </div>
    );
}

export { Sidebar };