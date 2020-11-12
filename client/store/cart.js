import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'

const getCart = cart => ({type: GET_CART, cart})

export const fetchCart = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}`)
    dispatch(getCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}
