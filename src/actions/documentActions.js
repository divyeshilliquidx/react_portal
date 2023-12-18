// actions/helpDeskActions.js

// export const FETCH_HELP_DESK_REQUEST = 'FETCH_HELP_DESK_REQUEST';
// export const FETCH_HELP_DESK_SUCCESS = 'FETCH_HELP_DESK_SUCCESS';
// export const FETCH_HELP_DESK_FAILURE = 'FETCH_HELP_DESK_FAILURE';

// export const fetchHelpDeskRequest = () => ({
//     type: FETCH_HELP_DESK_REQUEST,
// });

// export const fetchHelpDeskSuccess = (data) => ({
//     type: FETCH_HELP_DESK_SUCCESS,
//     payload: data,
// });

// export const fetchHelpDeskFailure = (error) => ({
//     type: FETCH_HELP_DESK_FAILURE,
//     payload: error,
// });

export const setDocumentData = (data) => ({
    type: 'SET_DOCUMENT_DATA',
    payload: data,
});
