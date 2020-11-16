import axios from 'axios'

//ACTION TYPES
const SET_FEATURED_PRODUCTS = 'SET_FEATURED_PRODUCTS'

const setFeatured = featured => ({
  type: SET_FEATURED_PRODUCTS,
  featured
})

// Fetch all featured products
export const fetchFeatured = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products/featured')
      dispatch(setFeatured(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_FEATURED_PRODUCTS:
      return action.featured
    default:
      return state
  }
}
