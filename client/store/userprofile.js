import axios from 'axios'

const UPDATE_A_USER = 'UPDATE_USER'
const SET_SINGLE_USER = 'SET_SINGLE_USER'

export const updateAUser = updatedUser => ({
  type: UPDATE_A_USER,
  updatedUser
})

export const setSingleUser = currentUser => {
  return {
    type: SET_SINGLE_USER,
    currentUser
  }
}

export const fetchSingleUser = userId => {
  return async dispatch => {
    try {
      const {data: user} = await axios.get(`/api/users-admin/${userId}`)
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
      return action.currentUser
    case UPDATE_A_USER:
      return action.updatedUser
    default:
      return state
  }
}
