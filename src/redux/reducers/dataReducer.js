import { 
    LOADING_DATA,
    SET_DISPENSARIES,
    SET_USERS, 
    SELECT_USER,
SELECT_DISPENSARY} from '../types';

    const initialState = {
        users: [],
        user: {},
        dispensaries: [],
        dispensary: {},
        loading: false
    }

    export default function(state = initialState, action) {
        switch(action.type) {
            case LOADING_DATA:
                return {
                    ...state,
                    loading: true
                };

            case SET_USERS: 
                return {
                    ...state,
                    loading: false,
                    users: action.payload,
                    user: action.payload[0]
                }; 
                case SELECT_USER: 
                return {
                    ...state,
                    loading: false,
                     user: action.payload
                }

                case SET_DISPENSARIES:
                    return {
                        ...state,
                        loading: false,
                        dispensaries: action.payload
                    }

                    case SELECT_DISPENSARY:
                        return {
                            ...state,
                            loading: false,
                            dispensary: action.payload
                        }
            
            default:
                return state;
        }
    }