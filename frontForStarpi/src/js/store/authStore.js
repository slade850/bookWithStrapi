import { combineReducers } from 'redux';
import api from '../utils/api'
import { setStorageToken, clearToken } from '../utils/local-storage'
import { addAuth } from '../utils/api';

export const doLogin = (body) => {
    // Run fetch user - DOING LOGIN
    // Call api ->  DOING LOGIN
    // Response ok -> user 
    // user -> SET_AUTH_USER 
    // LOGIN END
    // LOGIN FAILED
    return dispatch => {
        dispatch({ type: "DOING_LOGIN" })

        return api
            .post('auth/local', body)
                .then(response => {
                    console.log(response.data)
                    dispatch({type: 'SET_USER', payload: response.data.user})
                    dispatch({ type: "SET_AUTH_MESSAGE", payload: "you are logged in" })
                    addAuth(response.data.jwt)
                    setStorageToken(response.data.jwt)
                    })
                .catch(err => {
                    dispatch({ type: "SET_AUTH_MESSAGE", payload: err.response.data.messages.message })
                    clearToken()
                })
                .finally(res => setTimeout(() => { dispatch({type: "CLEAR_AUTH_MESSAGE"})}, 2000) )
    }
}


const defaultUserState = {
    isLogged: false,
    detail: {},
}

const user = (state = defaultUserState, action) => {
    const userAction = {
        "SET_USER": {...state, isLogged: true, detail: action.payload},
        "SET_USER_LOGGED": {...state, isLogged: action.payload},
        "CLEAR_USER": defaultUserState
    }
    return userAction[action.type] || state;
}

const authMessage = (state = {message: null} , action) => {
    const authMessageAction = {
        "SET_AUTH_MESSAGE": {...state, message: action.payload },
        "CLEAR_AUTH_MESSAGE": {...state, message: null }
    }
    return authMessageAction[action.type] || state;
}

const authFuntion = (state = false, action) => {
    const authFuntionAction = {
        "DOING_LOGIN": true
    }
    return authFuntionAction[action.type] || state;
}



const authReducer = combineReducers({
    user,
    authMessage,
    authFuntion
});


export default authReducer;