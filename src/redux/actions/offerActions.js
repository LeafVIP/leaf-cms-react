import axios from 'axios';

import {
    LOADING_DATA,
    SET_OFFERS,
    SELECT_OFFER,
    CLEAR_ERRORS,
    CREATE_OFFER,
    SET_ERRORS
} from '../types';

export const createOffer = (newOffer) => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    });
    axios
        .post('/createOffer', newOffer)
        .then(res => {
            dispatch({
                type: CREATE_OFFER,
                payload: res.data
            });
            dispatch(clearErrors());
            dispatch(getOffers());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};


export const selectOffer = (offer) => (dispatch) => {
    dispatch({
        type: SELECT_OFFER,
        payload: offer
    })
};

export const getOffers = () => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    });

    axios
        .get('/offers')
        .then(res => {
            console.log(res.data);
            dispatch({
                type: SET_OFFERS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};