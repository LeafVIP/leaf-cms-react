import { LOADING_USER, LOADING_DATA, SET_USERS, CREATE_USER, SET_UNAUTHENTICATED,SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SELECT_USER, FILTER_USERS, SET_DISPENSARY_USERS} from '../types';
import axios from 'axios';

export const deleteUser = (userId) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios
        .post('/deleteUser', {
            userId
        })
        .then(() => {
            dispatch({type: CLEAR_ERRORS});
            dispatch(getUsers());
        })
        .catch(err => {
            console.error(err);
            dispatch({type: SET_ERRORS, payload: err});
        });
}

export const uploadBadgeImage = (id, data) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .post('/uploadBadgeImage', {
            formData: data,
            userId: id
        })
        .then(() => {
            dispatch({type: CLEAR_ERRORS});
        })
        .catch(err => {
            console.error(err);
        })
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
        .cors({origin: true})
        .post('/signup', newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
};

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
        .post('/login', userData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err
            })
        });
};

export const logoutUser = () => (dispatch) => {
    console.log("userActions.logoutUser()");
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
};


export const createUser = (userData) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios
        .post('/createUser', userData)
        .then(res => {
            dispatch({
                type: CREATE_USER,
                payload: res.data
            });
        })
        .catch(err => {
            console.error(err);
        });
};

export const getUsers = (users) => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios  
        .post('/getUsers',{
            userIds: users
        })
        .then(res => {
            dispatch({
                type: SET_DISPENSARY_USERS,
                payload: res.data
            })
        })
        .catch(err => {
            console.error(err);
        })

}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });

    axios
        .get('/users')
        .then(res => {
            dispatch({
                type: SET_USERS,
                payload: res.data
            })
        })
        .catch(err => {
            console.error(err);
        });
};

export const setUser = (user) => (dispatch) => {
    dispatch({
        type: SELECT_USER,
        payload: user
    })

}

export const setUsers = (users) => (dispatch) => {
    dispatch({
        type: SET_USERS,
        payload: users
    });
}

export const filterUsers = (users) => (dispatch) => {
    dispatch({
        type: FILTER_USERS,
        payload: users
    })
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .post('/user/image', formData)
      .then(() => {
        dispatch(getUserData());
      })
      .catch((err) => console.log(err));
  };
  

  export const updateUser = (authId, userData) => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios
        .post('/updateUser', {
            userId: authId,
            userData: userData
        })
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err) => {
            console.error(err);
        })
  }


export const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}