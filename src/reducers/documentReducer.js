// reducers/documentReducer.js

// import {
//     FETCH_HELP_DESK_REQUEST,
//     FETCH_HELP_DESK_SUCCESS,
//     FETCH_HELP_DESK_FAILURE,
// } from '../actions/helpDeskActions';

// const initialState = {
//     loading: false,
//     data: [],
//     error: null,
// };

// const documentReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case FETCH_HELP_DESK_REQUEST:
//             return { ...state, loading: true };

//         case FETCH_HELP_DESK_SUCCESS:
//             return { ...state, loading: false, data: action.payload, error: null };

//         case FETCH_HELP_DESK_FAILURE:
//             return { ...state, loading: false, data: [], error: action.payload };

//         default:
//             return state;
//     }
// };

// export default documentReducer;

const initialState = {
    helpDeskData: [],
    currentPage: 1,
    totalPages: 1,
};

const documentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_HELP_DESK_DATA':
            return {
                ...state,
                helpDeskData: action.payload.data,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages,
            };
        default:
            return state;
    }
};

export default documentReducer;
