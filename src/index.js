// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';



// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


//
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import userReducer from './reducers/userReducer';
// import helpDeskReducer from './reducers/helpDeskReducer';
// import App from './App';

// const store = createStore(userReducer);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
// );

// index.js
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { createStore, combineReducers } from 'redux';
// import userReducer from './reducers/userReducer';
// import helpDeskReducer from './reducers/helpDeskReducer';
// import App from './App';

// // Combine reducers
// const rootReducer = combineReducers({
//   user: userReducer,
//   helpDesk: helpDeskReducer,
// });

// // Create Redux store
// const store = createStore(rootReducer);

// // Render the app with the Redux store
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

