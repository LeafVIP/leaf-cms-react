import axios from 'axios';
import {
    SET_DISPENSARIES,
    CREATE_DISPENSARY,
    CREATE_DISPENSARY_LIST,
    SELECT_DISPENSARY,
    SET_DISPENSARY_USERS,
    LOADING_DATA,
    SET_ERRORS, 
    CLEAR_ERRORS,
    LOADING_USER,
    GET_DISPENSARY_LISTS,
    LOADING_DISPENSARY_LIST,
} from '../types';

export const setDispensaries = (dispensaries) => (dispatch) => {
    dispatch({type: SET_DISPENSARIES, payload: dispensaries});
}
export const getDispensaryUsers = (userIds) => (dispatch) => {
    console.log('getDispensaryUsers: ' +userIds);
    dispatch({
        type: LOADING_USER
    });
    axios
        .post('/getUsers', {userIds})
        .then(res => {
            dispatch({
                type: SET_DISPENSARY_USERS,
                payload: res.data
            }
            );
        })
        .catch(err => {
            console.log(err);
        });
};

export const updateDispensary = (data) => (dispatch) => {
    console.log('in update dispensary');
    dispatch({
        type: LOADING_DATA
    });

    axios
        .post('/updateDispensary', {
             dispensaryId: data.id,
             data: data
        })
        .then(() => {
            dispatch({type: CLEAR_ERRORS});
            // dispatch({type: UPDATE_DISPENSARY, payload: data})  
            dispatch(getAllDispensaries());
        })
        .catch(err => {
            console.error(err);
        });
};

export const getAllDispensaries = () => (dispatch) => {
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

export const getDispensaries = (dispos) => (dispatch) => {

  
    const dispensaries = [];
    dispos.forEach(element => {
        dispensaries.push(element.id);
    });
 
    dispatch({
        type: LOADING_DATA
    });

    axios
        .post('/getDispensaries', {dispensaries: dispos})
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
export const getTop50 = () => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    });

    axios
        .get('/top50')
        .then(res => {
            console.log(res.data);
            dispatch({
                type: SET_DISPENSARIES,
                payload: res.data
            });
        })
        .catch(err => {
            console.error(err);
        })
}

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

export const selectDispensary = (dispensary) => (dispatch) => {
    dispatch({
        type: SELECT_DISPENSARY,
        payload: dispensary
    })
};

export const createList = (name, dispensaries) => (dispatch) => {
    dispatch({ type: LOADING_DISPENSARY_LIST });

    axios
        .post('/createList', {
            name,
            dispensaries
        })
        .then((res) => {
            dispatch({type: CLEAR_ERRORS});
            dispatch({type: CREATE_DISPENSARY_LIST, payload: res.data});
            // dispatch({type: CREATE_DISPENSARY_LIST, payload: res.data});
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });

}

export const deleteDispensaryList = (id) => (dispatch) => {
    dispatch({type: LOADING_DISPENSARY_LIST});
    axios.post('/deleteDispensaryList', {
        id
    })
    .then(() => {
        dispatch(getDispensaryLists())
    })
    .catch(err => {
        dispatch({type: SET_ERRORS, payload: err.data});
    });

};


export const getDispensaryLists = () => (dispatch) => {
    dispatch({type: LOADING_DISPENSARY_LIST});
    axios   
        .post("/getLists")
        .then(res => {
            dispatch({type: GET_DISPENSARY_LISTS, payload: res.data});
        })
        .catch(err => {
            dispatch({type: SET_ERRORS, payload: err.data});
        })
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};