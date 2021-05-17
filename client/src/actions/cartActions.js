import axios from 'axios';
import {returnErrors} from './errorActions';
import {GET_CART, ADD_TO_CART, DELETE_FROM_CART, CART_LOADING} from './types';

//func that fetches the specified user's cart
export const getCart = (id) => dispatch => {
    dispatch(setCartLoading());
    axios.get(`/api/cart/${id}`)
        .then(res => dispatch({
            type: GET_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//func that adds an item to the cart
export const addToCart = (id, productId, quantity) => dispatch => {
    axios.post(`/api/cart/${id}`, {productId, quantity})
        .then(res => dispatch({
            type: ADD_TO_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//func that deletes an item from the cart
export const deleteFromCart = (userId, itemId) => dispatch => {
    axios.delete(`/api/cart/${userId}/${itemId}`)
        .then(res => dispatch({
            type: DELETE_FROM_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//func that sets the type to cart loading
export const setCartLoading = () => {
    return{
        type: CART_LOADING
    }
}



