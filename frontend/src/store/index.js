import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import headerReducer from './reducers/headerReducer';

// Combine reducers
const rootReducer = combineReducers({
    header: headerReducer
});

// Create store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store; 