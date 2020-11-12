import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
const UPDATE_CART = 'UPDATE_CART'

const addItem = item => ({type: ADD_ITEM_TO_CART, item})
const removeItem = deletedItem => ({type: REMOVE_ITEM_FROM_CART, deletedItem})
const updateItem = updatedItem => ({type: UPDATE_ITEM, updatedItem})

export const addToCart = item => async dispatch => {
  try {
    const res = await axios.post('CREATE POST ROUTE')
    dispatch(addItem(res.data))
    history.push('/cart')
  } catch (err) {
    console.error(err)
  }
}

export const removeFromCart = item => async dispatch => {
  try {
    const res = await axios.delete('CREATE DELETE ROUTE')
    dispatch(removeItem(res.data))
    history.push('/cart')
  } catch (err) {
    console.error(err)
  }
}

export const updateInCart = item => async dispatch => {
  try {
    const res = await axios.delete('CREATE UPDATE ROUTE')
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  cart: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    // case ADD_ITEM_TO_CART:
    //   return {...state, cart: [...state.cart, ...action.cart]}
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
    default:
      return state
  }
}
