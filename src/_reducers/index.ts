import { combineReducers } from 'redux';
import { alert } from './Alert';
import { authentication } from './Authentication';
import { userInfo } from './User/userInfo';
import { listItem } from './Item';
const appReducers = combineReducers({
    alert,
    authentication,
    userInfo,
    listItem
});

export type AppState = ReturnType<typeof appReducers>;


export default appReducers;
