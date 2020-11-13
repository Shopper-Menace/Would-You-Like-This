import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
const UPDATE_CART = 'UPDATE_CART'

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
    case ADD_ITEM_TO_CART:
      return {...state, cart: [...state.cart, ...action.newItem]}
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
