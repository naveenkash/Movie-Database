import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';
const initialState = {};
const middleware = [thunk];
const store = createStore(allReducers,initialState,compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()));
export default store;