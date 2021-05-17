import {GET_ERRORS, CLEAR_ERRORS} from './types';

//func to return the errors as a payload
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: {msg, status, id}
    }
}

//func to clear the errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}