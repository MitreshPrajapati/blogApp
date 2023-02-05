import { applyMiddleware, 
    combineReducers, 
    compose,
    legacy_createStore } from 'redux'
import thunk from 'redux-thunk';
import { reducer as AppReducer } from './AppRed/reducer';
import { reducer as AuthReducer } from './AuthRed/reducer';

const rootReducer = combineReducers({ AppReducer, AuthReducer });

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))