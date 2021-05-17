import axios from 'axios';
import { json } from 'express';
import {returnErrors} from './errorActions';
import {USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from './types';

//func that changes state to currently loading 
export const loadUser = () => {
    dispatch({type: USER_LOADING});

    axios.get('/api/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
}

//func that takes info from the front end and makes it a json object
//pass in the data to the api and receive a response
//the data received is set as the payload and registration is successful
export const register = ({name, email, password}) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //request body
    const body = JSON.stringify({name, email, password});

    axios.post('/api/register', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });
}

//func that logs in the user
//takes user email and password and sends to the api
//payload is set to the data received 
export const login = ({email, password}) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //request body
    const body = JSON.stringify({email, password});

    axios.post('/api/login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });      
}

//func that logs out the user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

//func that sets up config, headers, and token
export const tokenConfig = getState => {
    //gets token from local storage
    const token = getState().auth.token;

    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}



