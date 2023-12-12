import { combineReducers } from 'redux';
import userReducer from './userReducer';
import helpDeskReducer from './helpDeskReducer';

const rootReducer = combineReducers({
    user: userReducer,
    helpDesk: helpDeskReducer,
});

export default rootReducer;