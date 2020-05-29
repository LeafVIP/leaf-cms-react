import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux';

import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};
const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
})

const store = createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware(...middleware),
        composeEnhancers(applyMiddleware(thunk))
     
    )
);

export default store;
