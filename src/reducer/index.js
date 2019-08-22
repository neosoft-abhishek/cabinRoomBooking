import {combineReducers} from 'redux';
import DemoReducer from './DemoReducer'
import UserDetails from './UserDetails'
import GetAllLocation from './GetAllLocation'
import GetAllCabins from './GetAllCabins'


const rootReducer = combineReducers({
    DemoReducer,
    UserDetails,
    GetAllLocation,
    GetAllCabins,
});

export default rootReducer;