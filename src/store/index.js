// import { createStore, combineReducers } from 'redux';
// import userReducer from '../reducers/userReducer'; // Assuming you already have a userReducer
// import helpDeskReducer from '../reducers/helpDeskReducer';

// const rootReducer = combineReducers({
//     user: userReducer,
//     helpDesk: helpDeskReducer,
// });

// const store = createStore(rootReducer);

// export default store;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer'; // Assuming you already have a userReducer
import helpDeskReducer from '../reducers/helpDeskReducer';
import documentReducer from '../reducers/documentReducer';

const rootReducer = combineReducers({
    user: userReducer,
    helpDesk: helpDeskReducer,
    document: documentReducer
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;