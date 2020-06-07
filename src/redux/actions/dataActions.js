import axios from 'axios';
import {
    LOADING_DATA,
    SET_USERS,
    CLEAR_ERRORS,
    SET_COMPLETED_OFFERS,
    SET_ERRORS,
} from '../types';


export const getUsers = () => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    });

    axios
        .get('/users')
        .then(res => {
            console.log(res.data);
            dispatch({
                type: SET_USERS,
                payload: res.data
            }
            );
        })
        .catch(err => {
            console.log(err);
        });
}




export const getCompletedOffers = (authId) => (dispatch) => {
    dispatch({type: LOADING_DATA});
    axios
        .get('/associatedOffersData')
        .then(res => {
            dispatch({
                type: SET_COMPLETED_OFFERS,
                payload: res.data
            })
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
};




export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};