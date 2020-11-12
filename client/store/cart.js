import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
const UPDATE_CART = 'UPDATE_CART'

const addItem = item => ({type: ADD_ITEM_TO_CART, item})
const removeItem = item => ({type: REMOVE_ITEM_FROM_CART, item})
const updateCart = cart => ({type: UPDATE_CART, cart})

export const addToCart = newItem => async dispatch => {
  try {
    const res = await axios.post('CREATE POST ROUTE')
    dispatch(addItem(res.data))
    history.push('/cart')
  } catch (err) {
    console.error(err)
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return {...state, cart: action.cart}
    case REMOVE_ITEM_FROM_CART:
      return {...state, cart}
    default:
      return state
  }
}
