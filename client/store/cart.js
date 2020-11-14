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
      console.log('maybe?')
      const previous = JSON.parse(localStorage.getItem('cart'))
      // step 1 get current local cart
      localStorage.clear()
      // step 2 clear current local cart
      console.log(previous, 'PREVIOUS')
      const tempCart = [...previous, action.item]
      // step 3 combine current local and new item into new array
      localStorage.setItem('cart', JSON.stringify(tempCart))
      // set cart in local storage as new array
      return {...state}
    case REMOVE_FROM_LOCAL_CART:
      const previousForRemove = JSON.parse(localStorage.getItem('cart'))
      //step 1 get previous cart
      localStorage.clear()
      //clear again
      const tempCartForRemove = previousForRemove.filter(
        item => item[0] !== action.item[0]
      )
      localStorage.setItem('cart', JSON.stringify(tempCartForRemove))
      //set local cart as filtered previous
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
