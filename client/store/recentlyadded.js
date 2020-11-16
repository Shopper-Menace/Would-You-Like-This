import axios from 'axios'

//ACTION TYPES
const SET_RECENT_PRODUCTS = 'SET_RECENT_PRODUCTS'

const setRecentlyAdded = recentlyadded => ({
  type: SET_RECENT_PRODUCTS,
  recentlyadded
})

//Fetch all Recently added products
export const fetchRecentlyAdded = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products/recentlyadded')
      dispatch(setRecentlyAdded(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_RECENT_PRODUCTS:
      return action.recentlyadded
    default:
      return state
  }
}
