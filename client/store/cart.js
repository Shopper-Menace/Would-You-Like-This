import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
const UPDATE_ITEM_IN_CART = 'UPDATE_ITEM_IN_CART'

const addItem = newItem => ({type: ADD_ITEM_TO_CART, newItem})
const removeItem = removedItem => ({type: REMOVE_ITEM_FROM_CART, removedItem})
const updateItem = updatedItem => ({type: UPDATE_ITEM_IN_CART, updatedItem})

export const addToCart = (orderId, itemId) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/addItem/${orderId}`, {itemId})
    dispatch(addItem(res.data))
    history.push('/cart')
    window.location.reload()
  } catch (err) {
    console.error(err)
  }
}

export const removeFromCart = (orderId, itemId) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/removeItem/${orderId}`, {itemId})
    dispatch(removeItem(res.data))
    window.location.reload()
  } catch (err) {
    console.error(err)
  }
}

export const updateInCart = item => async dispatch => {
  try {
    const res = await axios.put(`/api/users/updateItem/${item.id}`, item)
    dispatch(updateItem(res.data))
    history.push('/cart')
  } catch (err) {
    console.error(err)
  }
}

// local cart
const ADD_TO_LOCAL_CART = 'ADD_TO_LOCAL_CART'
const REMOVE_FROM_LOCAL_CART = 'REMOVE_FROM_LOCAL_CART'

const addLocal = item => ({type: ADD_TO_LOCAL_CART, item})
const removeLocal = item => ({type: REMOVE_FROM_LOCAL_CART, item})

export const addToLocal = item => async dispatch => {
  try {
    dispatch(addLocal(item))
    history.push('/cart')
    // window.location.reload()
  } catch (err) {
    console.error(err)
  }
}

export const removeFromLocal = item => async dispatch => {
  try {
    dispatch(removeLocal(item))
    window.location.reload()
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  cart: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      // return {...state, cart: [...state.cart, ...action.newItem]}
      return {...state}
    case REMOVE_ITEM_FROM_CART:
      return {...state}
    case UPDATE_ITEM_IN_CART:
      return {...state}
    case ADD_TO_LOCAL_CART:
      let previousForAdd = JSON.parse(localStorage.getItem('cart'))
      localStorage.clear()
      let tempCartForAdd = [...previousForAdd, action.item]
      localStorage.setItem('cart', JSON.stringify(tempCartForAdd))
      return {...state}
    case REMOVE_FROM_LOCAL_CART:
      let previousForRemove = JSON.parse(localStorage.getItem('cart'))
      localStorage.clear()
      let tempCartForRemove = previousForRemove.filter(
        item => item[0] !== action.item[0]
      )
      localStorage.setItem('cart', JSON.stringify(tempCartForRemove))
      return {...state}
    default:
      if (!JSON.parse(localStorage.getItem('cart')))
        localStorage.setItem('cart', JSON.stringify([]))
      return state
  }
}
