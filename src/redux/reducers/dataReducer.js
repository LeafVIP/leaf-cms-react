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
    SET_OFFER,
    SET_COMPLETED_OFFERS,
    DELETE_OFFER,
    UPDATE_OFFER,
    SET_DISPENSARY_USERS,
    SET_BRANDS, 
    CREATE_BRAND, 
    UPDATE_BRAND, 
    DELETE_BRAND, 
    CREATE_OFFER,
    DELETE_DISPENSARIES,
    CREATE_DISPENSARY_LIST,
    GET_DISPENSARY_LISTS
} from '../types';

    const initialState = {
        users: [],
        dispensaryUsers: [],
        user: {},
        dispensaries: [],
        dispensary_lists: [],
        dispensary: {},
        items: [],
        brands: [],
        brand: {},
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

            case SET_OFFER:
                return {
                    ...state,
                    laoding: false,
                    offer: action.payload
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
                        dispensaries: action.payload
                  
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



            // Offers
            case SET_OFFERS:
                return {
                    ...state,
                    loading: false,
                    offers: action.payload
                }
            case DELETE_OFFER:
                const activeOffers = state.brands.filter(function(entity) {
                    return entity.id !== id;
                })
                return {
                    ...state,
                    loading: false,
                    offers: activeOffers
                }
            case UPDATE_OFFER:
                return {
                    ...state,
                    loading: false,
                    offer: action.payload
                }
            case CREATE_OFFER:
                const newOffers =[action.payload, ...state.offers];
                return {
                    ...state,
                    loading: false,
                    offers: newOffers
                }

            case DELETE_DISPENSARIES:
                return {
                    ...state,
                    loading: false
                }

            // Brands
            case SET_BRANDS:
            return {
                ...state,
                laoding: false,
                brands: action.payload
            }

        case CREATE_BRAND: 
        const newBrands =[action.payload, ...state.brands];
            return {
                ...state,
                loading: false,
                brands: newBrands
            }
    
        case UPDATE_BRAND:
            return {
                ...state,
                loading: false,
            }

        case DELETE_BRAND:
        
            const id = action.payload;
            const deletedBrands = state.brands.filter(function(entity) {
                return entity.id !== id;
            })
            return {
                ...state,
                loading: false,
                brands: deletedBrands
            }


        case CREATE_DISPENSARY_LIST:
            return {
                ...state,
                loading: false,
                dispensaries: state.dispensaries
            }
    
        case GET_DISPENSARY_LISTS:
            return {
                ...state,
                loading: false,
                dispensary_lists: action.payload
            }

            default:
                return state;
        }
    }
