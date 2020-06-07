import { 
    LOADING_DATA,
    SET_DISPENSARIES,
    SELECT_DISPENSARY,
    UPDATE_DISPENSARY,
    SET_USERS, 
    FILTER_USERS,
    SELECT_USER,
    APPROVE_USER,
    UNAPPROVE_USER, 
    SET_OFFERS,
    SET_COMPLETED_OFFERS,
    SELECT_OFFER,
    SET_DISPENSARY_USERS} from '../types';

    const initialState = {
        users: [],
        dispensaryUsers: [],
        user: {},
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
                case SET_DISPENSARY_USERS:
                    return {
                        ...state,
                        loading: false,
                        dispensaryUsers: action.payload
                    }
                case SELECT_USER: 
                return {
                    ...state,
                    loading: false,
                     user: action.payload
                }


        case SET_COMPLETED_OFFERS:
            return {
                ...state,
                loading: false,
                offers: action.payload
            }

                case FILTER_USERS:
                    return {
                        ...state,
                        loading: false,
                        users: action.payload
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
                        dispensary: action.payload[0],
                        dispensaryUsers: action.payload[0].users
                    }
                case SELECT_DISPENSARY:
                    return {
                        ...state,
                        loading: false,
                        dispensary: action.payload
                    }

                    case UPDATE_DISPENSARY:
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