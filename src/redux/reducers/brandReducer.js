import {
    CREATE_BRAND,
    UPDATE_BRAND,
    DELETE_BRAND,
    SET_BRANDS,
    LOADING_UI,
} from '../types';

const initialState = {
    brands: [],
    brand: {},
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }

        case SET_BRANDS:
            return {
                ...state,
                laoding: false,
                brands: action.payload
            }

        case CREATE_BRAND: 
            const newBrands =[action.payload, ...brands];
            console.log('newBrands' +newBrands);
            return {
                ...state,
                loading: false,
                brands: newBrands
            }
    
        case UPDATE_BRAND:
            return {
                ...state,
                loading: false,
                brand: action.payload
            }

        case DELETE_BRAND:
            return {
                ...state,
                loading: false,
                brand: {}
            }

    }
}