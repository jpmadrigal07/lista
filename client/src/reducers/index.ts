import { combineReducers } from 'redux';
import navBarReducer from './navbarReducer';
import recordReducer from './recordReducers';
import topAlertReducer from './topAlertReducers';

export default combineReducers({
    navBar: navBarReducer,
    record: recordReducer,
    topAlert: topAlertReducer,
});