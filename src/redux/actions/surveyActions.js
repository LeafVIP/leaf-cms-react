import axios from 'axios';

import {
    LOADING_DATA,
    LOADING_UI,
    SET_ERRORS,
    CLEAR_ERRORS,
    SET_SURVEYS,
    SET_SURVEY,

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

export const createSurvey = (offerId, surveyId) => (dispatch) => {
    console.log(`createSurvey: offerId = ${offerId}, surveyId = ${surveyId}`);
    dispatch({
        type: LOADING_UI
    });

    axios.post('/createSurvey', {
        offerId,
        surveyId
    })
    .then(res => {
        console.log(res);
        dispatch({type: CLEAR_ERRORS});
        dispatch(getSurveys());
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err
        })
    })
}

export const getSurvey = (id) => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    });

    axios   
        .get(`/survey`, {
            id
        })
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

export const setSurvey = (survey) => (dispatch) => {
    dispatch({
        type: SET_SURVEY,
        payload: survey
    });
}