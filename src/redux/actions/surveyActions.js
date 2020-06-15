import axios from 'axios';

import {
    LOADING_DATA,
    SET_ERRORS,
    CLEAR_ERRORS,
    SET_SURVEYS,
} from '../types';

export const getSurveys = () => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    });

    axios   
        .get('/surveys')
        .then(res => {
        
            dispatch({
                type: SET_SURVEYS,
                payload: res.data
            });
            dispatch({type: CLEAR_ERRORS});
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err
            })
        })
}