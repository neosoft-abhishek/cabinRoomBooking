import {combineReducers} from 'redux';
import DemoReducer from './DemoReducer'
import UserDetails from './UserDetails'


const rootReducer = combineReducers({
    DemoReducer,
    UserDetails
});

export default rootReducer;