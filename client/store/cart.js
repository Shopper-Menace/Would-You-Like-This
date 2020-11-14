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
    console.log('INSIDE THUNK')
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
    default:
      return state
  }
}

// case REMOVE_ITEM_FROM_CART:
//   return {
//     ...state,
//     cart: [...state.cart.filter(item => item.id !== action.deletedItem.id)]
//   }
// case UPDATE_CART:
//   return {
//     ...state,
//     cart: [
//       ...state.cart.map(item => {
//         item.id === action.updatedItem.id ? action.updatedItem : item
//       })
//     ]
//   }
