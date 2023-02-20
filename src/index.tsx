import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import appReducers from './_reducers';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const middleware = [
    reduxThunk,
];

const store = createStore(
    appReducers,
    compose(
        applyMiddleware(...middleware),
        typeof (window as any).__REDUX_DEVTOOLS_EXTENSION__ === 'undefined'
            ? (a: any) => a
            : (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
);

ReactDOM.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </Provider>,
    document.getElementById('root')
);