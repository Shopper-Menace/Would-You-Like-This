import axios from 'axios'

//ACTION TYPES
const UPDATE_EXISTING_PRODUCT = 'UPDATE_EXISTING_PRODUCT'
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const SET_PRODUCTS = 'SET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//ACTION CREATORS
const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

const addNewProduct = product => ({
  type: ADD_NEW_PRODUCT,
  product
})

const updateExistingProduct = productId => ({
  type: UPDATE_EXISTING_PRODUCT,
  productId
})

const deleteAProduct = productId => ({
  type: DELETE_PRODUCT,
  productId
})

const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
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

//EDIT PRODUCT
export const updateProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/${product.id}`)
      dispatch(updateExistingProduct(data))
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

export const fetchSingleProduct = id => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`)
    dispatch(getSingleProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  products: [],
  product: {}
}

export default function products(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case ADD_NEW_PRODUCT:
      return {...state, products: [...state, action.product]}
    case UPDATE_EXISTING_PRODUCT:
      return {...state, products: action.products}
    case GET_SINGLE_PRODUCT:
      return {...state, product: action.product}
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}
