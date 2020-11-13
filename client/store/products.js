import axios from 'axios'

//ACTION TYPES
const UPDATE_EXISTING_PRODUCT = 'UPDATE_EXISTING_PRODUCT'
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const SET_PRODUCTS = 'SET_PRODUCTS'

//ACTION CREATORS
export const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

export const addNewProduct = newProduct => ({
  type: ADD_NEW_PRODUCT,
  newProduct
})

export const updateExistingProduct = productId => ({
  type: UPDATE_EXISTING_PRODUCT,
  productId
})

export const deleteProduct = productId => ({
  type: DELETE_PRODUCT,
  productId
})

//THUNKS
export const fetchAllProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      console.log('data in thunk', data)
      dispatch(setProducts(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = []

export default function products(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
