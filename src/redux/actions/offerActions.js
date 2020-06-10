import axios from 'axios';

import {
    LOADING_DATA,
    SET_OFFERS,
    DELETE_OFFER,
    UPDATE_OFFER,
    CLEAR_ERRORS,
    CREATE_OFFER,
    SET_ERRORS,
    LOADING_UI
} from '../types';



export const selectOffer = (offer) => (dispatch) => {
    dispatch({
        type: SELECT_OFFER,
        payload: offer
    })
};


export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};