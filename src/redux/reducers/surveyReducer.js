import {
LOADING_DATA,
SET_SURVEYS,
CREATE_SURVEY,
SET_SURVEY
} from '../types';

const initialState = {
    surveyData: [],
    surveyDetails: {},
    suurveyResults: [],
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
        
        case SET_SURVEY:
            return {
                ...state,
                surveyDetails: action.payload
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