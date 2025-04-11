import axios from 'axios';
import { toast } from 'react-toastify';
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
} from './types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const handleError = (error, message = 'An error occurred') => {
    console.error('API Error:', error);
    const errorMessage = error.response?.data?.message || error.message || message;
    toast.error(errorMessage);
    return errorMessage;
};

// Header Actions
export const fetchHeader = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_HEADER_REQUEST });
        const response = await axios.get(`${API_URL}/header`);
        dispatch({ type: FETCH_HEADER_SUCCESS, payload: response.data });
    } catch (error) {
        const errorMessage = handleError(error, 'Failed to fetch header items');
        dispatch({ type: FETCH_HEADER_FAILURE, payload: errorMessage });
    }
};

export const addHeaderItem = (item) => async (dispatch) => {
    try {
        dispatch({ type: ADD_HEADER_ITEM_REQUEST });
        const response = await axios.post(`${API_URL}/header`, item);
        dispatch({ type: ADD_HEADER_ITEM_SUCCESS, payload: response.data.data });
        toast.success('Header item added successfully');
    } catch (error) {
        const errorMessage = handleError(error, 'Failed to add header item');
        dispatch({ type: ADD_HEADER_ITEM_FAILURE, payload: errorMessage });
    }
};

export const updateHeaderItem = (id, item) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_HEADER_ITEM_REQUEST });
        const response = await axios.put(`${API_URL}/header/${id}`, item);
        dispatch({ type: UPDATE_HEADER_ITEM_SUCCESS, payload: response.data.data });
        toast.success('Header item updated successfully');
    } catch (error) {
        const errorMessage = handleError(error, 'Failed to update header item');
        dispatch({ type: UPDATE_HEADER_ITEM_FAILURE, payload: errorMessage });
    }
};

export const deleteHeaderItem = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_HEADER_ITEM_REQUEST });
        await axios.delete(`${API_URL}/header/${id}`);
        dispatch({ type: DELETE_HEADER_ITEM_SUCCESS, payload: id });
        toast.success('Header item deleted successfully');
    } catch (error) {
        const errorMessage = handleError(error, 'Failed to delete header item');
        dispatch({ type: DELETE_HEADER_ITEM_FAILURE, payload: errorMessage });
    }
};

// Logo Actions
export const fetchLogo = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_LOGO_REQUEST });
        const response = await axios.get(`${API_URL}/header/logo`);
        dispatch({ type: FETCH_LOGO_SUCCESS, payload: response.data.data });
    } catch (error) {
        const errorMessage = handleError(error, 'Failed to fetch logo');
        dispatch({ type: FETCH_LOGO_FAILURE, payload: errorMessage });
    }
};

export const updateLogo = (formData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_LOGO_REQUEST });
        const response = await axios.put(`${API_URL}/header/logo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({ type: UPDATE_LOGO_SUCCESS, payload: response.data.data });
        toast.success('Logo updated successfully');
    } catch (error) {
        const errorMessage = handleError(error, 'Failed to update logo');
        dispatch({ type: UPDATE_LOGO_FAILURE, payload: errorMessage });
    }
};