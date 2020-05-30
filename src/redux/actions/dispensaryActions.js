import axios from 'axios';
import {
    SET_DISPENSARIES,
    CREATE_DISPENSARY,
    SELECT_DISPENSARY,
    LOADING_DATA,
    SET_ERRORS, 
    CLEAR_ERRORS
} from '../types';


export const getDispensaries = () => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    });

    axios
        .get('/dispensaries')
        .then(res => {
            console.log(res.data);
            dispatch({
                type: SET_DISPENSARIES,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        });

}

export const getTop50 = () => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    });

    axios
        .get('/top50')
        .then(res => {
            console.log(res.data);
            dispatch({
                type: SET_DISPENSARIES,
                payload: res.data
            });
        })
        .catch(err => {
            console.error(err);
        })
}
export const createDispensary = (newDispensary) => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    });

    console.log('dataActions.createDispenseary: ' +newDispensary);
    axios
    .post('/createDispensary', newDispensary)
    .then(res => {
        dispatch({
            type: CREATE_DISPENSARY,
            payload: res.data
        })

        dispatch(clearErrors());
        dispatch(getDispensaries());
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const selectDispensary = (dispensary) => (dispatch) => {
    dispatch({
        type: SELECT_DISPENSARY,
        payload: dispensary
    })
};

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};