
import { createStore, combineReducers, applyMiddleware } from 'redux';
import rootReducer from '../reducer/index'
import thunk from 'redux-thunk';


const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;