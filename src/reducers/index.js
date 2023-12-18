import { combineReducers } from 'redux';
import userReducer from './userReducer';
import helpDeskReducer from './helpDeskReducer';
import documentReducer from './documentReducer';

const rootReducer = combineReducers({
    user: userReducer,
    helpDesk: helpDeskReducer,
    document: documentReducer,
});

export default rootReducer;