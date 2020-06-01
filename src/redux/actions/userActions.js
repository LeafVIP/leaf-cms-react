import { LOADING_USER, SET_USERS, SET_UNAUTHENTICATED,SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SELECT_USER, FILTER_USERS} from '../types';
import axios from 'axios';

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

export const getUser = (authId) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .get('/users')
        
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });

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
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
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