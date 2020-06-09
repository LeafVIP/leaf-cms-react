import axios from 'axios';
import {
    LOADING_DATA,
    LOADING_UI,
    SET_USERS,
    CLEAR_ERRORS,
    SET_COMPLETED_OFFERS,
    SET_ERRORS,
    CREATE_BRAND,
    UPDATE_BRAND,
    DELETE_BRAND,
    SET_BRANDS
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

export const createBrand = (newBrandData) => (dispatch) => {
    dispatch({type: LOADING_UI});

    axios
        .post('/createBrand', newBrandData)
        .then(res => {
            dispatch({type: CLEAR_ERRORS});
            dispatch({type: CREATE_BRAND, payload: res.data})
           
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

export const updateBrand = (brandId, data) => (dispatch) => {
    dispatch({type: LOADING_UI});

    axios
        .post('/updateBrand', {brandId, data})
        .then(res => {
            dispatch({type: CLEAR_ERRORS});
            dispatch({type: UPDATE_BRAND, payload: res.data});
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });  
};

export const deleteBrand = (brandId) => (dispatch) => {
    dispatch({type: LOADING_UI});

    axios
    .post('/deleteBrand', {brandId})
    .then(res => {
        dispatch({type: CLEAR_ERRORS});
        dispatch({type: DELETE_BRAND, payload: res.data});
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });  
};

export const getBrands = () => (dispatch) => {
    dispatch({type: LOADING_UI});

    axios
        .get('/brands')
        .then(res => {
            dispatch({type: CLEAR_ERRORS});
            dispatch({type: SET_BRANDS, payload: res.data});
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });  
};


export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};