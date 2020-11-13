import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
const UPDATE_ITEM_IN_CART = 'UPDATE_ITEM_IN_CART'


//ACTION CREATORS
const addItem = itemId => ({
  type: ADD_ITEM_TO_CART,
  itemId
})


const removeItem = itemId => ({
  type: REMOVE_ITEM_FROM_CART,
  itemId
})

const updateItem = itemId => ({
  type: UPDATE_ITEM,
  itemId
})

//THUNKS
export const addToCart = itemId => async dispatch => {
  try {
    const {data: newItem} = await axios.post(`/api/products/${itemId}`)
    dispatch(addItem(newItem))
    history.push('/cart')
  } catch (err) {
    console.error(err)
  }
}

export const removeFromCart = (orderId, itemId) => async dispatch => {
  console.log('INSIDE THUNK')
  try {
    const res = await axios.put(`/api/users/${orderId}`, {itemId})
    dispatch(removeItem(res.data))
    history.push('/home')
  } catch (err) {
    console.error(err)
  }
}

export const updateInCart = item => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${item.id}`, item)
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
      return {...state, cart: [...state.cart, ...action.newItem]}
    case REMOVE_ITEM_FROM_CART:
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
