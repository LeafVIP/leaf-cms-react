import {
    LOADING_DATA,
    SET_USERS,
    SELECT_USER,
    CLEAR_ERRORS,
    SET_DISPENSARIES,
    SET_DISPENSARY_USERS,
    SET_COMPLETED_OFFERS,
    SELECT_DISPENSARY,
    CREATE_DISPENSARY,
    SET_OFFERS,
    SELECT_OFFER,
    SET_ERRORS,
    FILTER_USERS
} from '../types';


import axios from 'axios';

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

// get all user's in the database
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

// used by role filtering
export const setUsers = (users) => (dispatch) => {
    dispatch({
        type: SET_USERS,
        payload: users
    });
}

export const setUser = (user) => (dispatch) => {
    dispatch({
        type: SELECT_USER,
        payload: user
    })

}

export const filterUsers = (users) => (dispatch) => {
    dispatch({
        type: FILTER_USERS,
        payload: users
    })
}

export const selectDispensary = (dispensary) => (dispatch) => {
    dispatch({
        type: SELECT_DISPENSARY,
        payload: dispensary
    })
}

export const selectOffer = (offer) => (dispatch) => {
    dispatch({
        type: SELECT_OFFER,
        payload: offer
    })
}

export const getDispensaryUsers = (id) => (dispatch) => {
    console.log('getDispensaryUsers: ' +id);
    dispatch({type: LOADING_DATA});
    axios
        .post('/dispensaryUsers',{
            dispensaryId: id
        })
        .then(res => {
            dispatch({
                type: SET_DISPENSARY_USERS,
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

// get all dispensaries in the database
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