import {
    FETCH_HEADER_REQUEST,
    FETCH_HEADER_SUCCESS,
    FETCH_HEADER_FAILURE,
    ADD_HEADER_ITEM_REQUEST,
    ADD_HEADER_ITEM_SUCCESS,
    ADD_HEADER_ITEM_FAILURE,
    UPDATE_HEADER_ITEM_REQUEST,
    UPDATE_HEADER_ITEM_SUCCESS,
    UPDATE_HEADER_ITEM_FAILURE,
    DELETE_HEADER_ITEM_REQUEST,
    DELETE_HEADER_ITEM_SUCCESS,
    DELETE_HEADER_ITEM_FAILURE,
    FETCH_LOGO_REQUEST,
    FETCH_LOGO_SUCCESS,
    FETCH_LOGO_FAILURE,
    UPDATE_LOGO_REQUEST,
    UPDATE_LOGO_SUCCESS,
    UPDATE_LOGO_FAILURE
} from '../actions/types';

const initialState = {
    headerItems: [],
    logo: null,
    loading: false,
    error: null
};

const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_HEADER_REQUEST:
        case ADD_HEADER_ITEM_REQUEST:
        case UPDATE_HEADER_ITEM_REQUEST:
        case DELETE_HEADER_ITEM_REQUEST:
        case FETCH_LOGO_REQUEST:
        case UPDATE_LOGO_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_HEADER_SUCCESS:
            return {
                ...state,
                headerItems: action.payload,
                loading: false
            };

        case ADD_HEADER_ITEM_SUCCESS:
            return {
                ...state,
                headerItems: [...state.headerItems, action.payload],
                loading: false
            };

        case UPDATE_HEADER_ITEM_SUCCESS:
            return {
                ...state,
                headerItems: state.headerItems.map(item =>
                    item._id === action.payload._id ? action.payload : item
                ),
                loading: false
            };

        case DELETE_HEADER_ITEM_SUCCESS:
            return {
                ...state,
                headerItems: state.headerItems.filter(item => item._id !== action.payload),
                loading: false
            };

        case FETCH_LOGO_SUCCESS:
            return {
                ...state,
                logo: action.payload,
                loading: false
            };

        case UPDATE_LOGO_SUCCESS:
            return {
                ...state,
                logo: action.payload,
                loading: false
            };

        case FETCH_HEADER_FAILURE:
        case ADD_HEADER_ITEM_FAILURE:
        case UPDATE_HEADER_ITEM_FAILURE:
        case DELETE_HEADER_ITEM_FAILURE:
        case FETCH_LOGO_FAILURE:
        case UPDATE_LOGO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default headerReducer; 