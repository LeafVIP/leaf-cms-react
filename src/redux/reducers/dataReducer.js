import { 
    LOADING_DATA,
    SET_DISPENSARIES,
    SELECT_DISPENSARY,
    SET_USERS, 
    FILTER_USERS,
    SELECT_USER,
    APPROVE_USER,
    UNAPPROVE_USER, 
    SET_OFFERS,
    SELECT_OFFER} from '../types';

    const initialState = {
        users: [],
        user: {},
        userFilter: [],
        dispensaries: [],
        dispensary: {},
        items: [],
        offers: [],
        offer: {},
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
                    user: action.payload[0],
                    userFilter: action.payload
                }; 
                case SELECT_USER: 
                return {
                    ...state,
                    loading: false,
                     user: action.payload
                }
                case FILTER_USERS:
                    return {
                        ...state,
                        loading: false,
                        userFilter: action.payload
                    }
                case APPROVE_USER:
                case UNAPPROVE_USER:
                    return {
                        ...state,
                        loading: false,
                         user: action.payload
                    }

                case SET_DISPENSARIES:
                    return {
                        ...state,
                        loading: false,
                        dispensaries: action.payload,
                        dispensary: action.payload[0]
                    }
                case SELECT_DISPENSARY:
                    return {
                        ...state,
                        loading: false,
                        dispensary: action.payload
                    }

                    case SET_OFFERS:
                        return {
                            ...state,
                            loading: false,
                            offers: action.payload,
                            offer: action.payload[0]
                        }

                case SELECT_OFFER:
                    return {
                        ...state,
                       loading: false,
                       offer: action.payload
                    }

            
            default:
                return state;
        }
    }