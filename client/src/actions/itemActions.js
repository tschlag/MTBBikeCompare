import axios from 'axios';
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, ITEMS_LOADING} from './types';
import {returnErrors} from './errorActions';

//func fetches all items from the backend
export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//func that adds a new item to the database
//take in the item object through frontend forms and send
//this data to the API endpoint responsible for adding the item
export const addItem = (item) => (dispatch) => {
    axios.post('/api/items', item)
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//func that deletes an existing item from the database
export const deleteItem = (id) => (dispatch) => {
    axios.delete(`/api/items/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//func that updates an existing item present in the inventory
export const updateItem = (id, item) => (dispatch) => {
    axios.put(`/api/items/${id}`, item)
        .then(res => dispatch({
            type: UPDATE_ITEM,
            payload: Promise.all([id, res.data])
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//func that sets the type to items loading
export const setItemsLoading = () => {
    return{
        type: ITEMS_LOADING
    }
}