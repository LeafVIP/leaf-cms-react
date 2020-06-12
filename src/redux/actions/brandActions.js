import axios from 'axios';
import {
    CREATE_BRAND,
    UPDATE_BRAND,
    DELETE_BRAND,
    SET_BRANDS,
    LOADING_UI,
    CLEAR_ERRORS,
    SET_ERRORS
} from '../types';


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
            dispatch(getBrands());
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