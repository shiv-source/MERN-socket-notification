import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import isLoginReducer from './Auth/Auth.Reducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(isLoginReducer,composeEnhancers(applyMiddleware(thunk)));

export default store;
