import axios from 'axios';
import {
    SET_DISPENSARIES,
    CREATE_DISPENSARY,
    SELECT_DISPENSARY,
    SET_DISPENSARY_USERS,
    LOADING_DATA,
    SET_ERRORS, 
    CLEAR_ERRORS,
    LOADING_USER
} from '../types';

export const getDispensaryUsers = (userIds) => (dispatch) => {
    console.log('getDispensaryUsers: ' +userIds);
    dispatch({
        type: LOADING_USER
    });
    axios
        .post('/getUsers', {userIds})
        .then(res => {
            dispatch({
                type: SET_DISPENSARY_USERS,
                payload: res.data
            }
            );
        })
        .catch(err => {
            console.log(err);
        });
};


export const updateDispensary = (dispensaryId, data) => (dispatch) => {
    console.log('in update dispensary');
    dispatch({
        type: LOADING_DATA
    });

    axios
        .post('/updateDispensary', {
             dispensaryId,
             data
        })
        .then(res => {
         dispatch(getDispensaries())
        
        })
        .catch(err => {
            console.error(err);
        });
};

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