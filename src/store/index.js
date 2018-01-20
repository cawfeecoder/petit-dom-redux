import reducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux'
import historyMiddleware from './middleware/history';
import history from './history'

const initialState = {
    location: history.location
}

const middleware = [
    historyMiddleware(history)
];

const store = createStore(
    reducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
export const dispatch = store.dispatch;
