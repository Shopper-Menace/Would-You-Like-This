import axios from 'axios'

//ACTION TYPES
const UPDATE_A_PRODUCT = 'UPDATE_A_PRODUCT'
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

//ACTION CREATORS

const updateAProduct = updatedProduct => ({
  type: UPDATE_A_PRODUCT,
  updatedProduct
})

const setSingleProduct = product => ({
  type: SET_SINGLE_PRODUCT,
  product
})

//THUNKS

//SINGLE PRODUCT
export const fetchSingleProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      console.log('product data in thunk for single product view', data)
      dispatch(setSingleProduct(data))
    } catch (err) {
      console.error(err)
    }
  }
}

//EDIT PRODUCT
export const updateProduct = (productId, newInfo) => {
  return async dispatch => {
    try {
      const {data: updatedProduct} = await axios.put(
        `/api/products/${productId}`,
        newInfo
      )
      dispatch(updateAProduct(updatedProduct))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {}

export default function product(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product
    case UPDATE_A_PRODUCT:
      return action.updatedProduct
    default:
      return state
  }
}
