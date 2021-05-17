import axios from 'axios';
import { eturnErrors} from './errorActions';
import {GET_ORDERS, CHECKOUT, ORDERS_LOADING} from './types';

//function that gets the orders and sets the payload as the response
export const getOrders = (id) => dispatch => {
    dispatch(setOrdersLoading());
    axios.get(`/api/order/${id}`)
        .then(res => dispatch({
            type: GET_ORDERS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//func that is used to place an order
export const checkout = (id, source) => dispatch => {
    axios.post(`/api/order/${id}`, {source})
        .then(res => dispatch({
            type: CHECKOUT,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//func that sets the type to orders loading
export const setOrdersLoading = () => {
    return{
        type: ORDERS_LOADING
    }
}



