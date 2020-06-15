import {
LOADING_DATA,
SET_SURVEYS,
CREATE_SURVEY
} from '../types';

const initialState = {
    surveyData: [],
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING_DATA: 
            return {
                ...state,
                loading: true
            }

        case SET_SURVEYS:
            return {
                ...state,
                loading: false,
                surveyData: action.payload
            }
        
        case CREATE_SURVEY: 
            return {
                ...state,
                loading: false,
            }    

        default:
            return state;
    }
};