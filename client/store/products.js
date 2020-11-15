import axios from 'axios'

//ACTION TYPES
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const SET_PRODUCTS = 'SET_PRODUCTS'

//ACTION CREATORS
const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

const addNewProduct = product => ({
  type: ADD_NEW_PRODUCT,
  product
})

const deleteAProduct = productId => ({
  type: DELETE_PRODUCT,
  productId
})

//THUNKS
//Fetch all
export const fetchAllProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(setProducts(data))
    } catch (err) {
      console.error(err)
    }
  }
}

//ADD NEW PRODUCT
export const addProduct = product => {
  return async dispatch => {
    try {
      const {data: newProduct} = await axios.post('/api/products', product)
      dispatch(addNewProduct(newProduct))
    } catch (err) {
      console.error(err)
    }
  }
}

//DELETE PRODUCT
export const deleteProduct = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${productId}`)
      dispatch(deleteAProduct(productId))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case ADD_NEW_PRODUCT:
      return [...state, action.product]
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}
