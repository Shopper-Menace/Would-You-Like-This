import axios from 'axios'

const SET_SINGLE_USER = 'SET_SINGLE_USER'
const UPDATE_A_USER = 'UPDATE_USER'

export const setSingleUser = singleUser => {
  return {
    type: SET_SINGLE_USER,
    singleUser
  }
}

export const updateAUser = updatedUser => ({
  type: UPDATE_A_USER,
  updatedUser
})

export const fetchSingleUser = id => {
  return async dispatch => {
    try {
      const {data: user} = await axios.get(`/api/users-admin/${id}`)
      dispatch(setSingleUser(user))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateUser = (userId, newInfo) => {
  return async dispatch => {
    try {
      const {data: updatedUser} = await axios.put(
        `/api/users-admin/${userId}`,
        newInfo
      )
      dispatch(updateAUser(updatedUser))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {}

export default function userprofile(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_USER:
      return action.singleUser
    case UPDATE_A_USER:
      return action.updatedUser
    default:
      return state
  }
}
