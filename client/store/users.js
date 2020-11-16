import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_USERS = 'SET_USERS'
const ADD_NEW_USER = 'ADD_NEW_USER'
const DELETE_USER = 'DELETE_USER'

/**
 * ACTION CREATORS
 */
const setUsers = allUsers => ({
  type: SET_USERS,
  allUsers
})

const addNewUser = newUser => ({
  type: ADD_NEW_USER,
  newUser
})

const deleteAUser = userId => ({
  type: DELETE_USER,
  userId
})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data: allUsers} = await axios.get('/api/users-admin')
      dispatch(setUsers(allUsers))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addUser = user => {
  return async dispatch => {
    try {
      const {data: newUser} = await axios.post('/api/users-admin', user)
      dispatch(addNewUser(newUser))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteUser = userId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users-admin/${userId}`)
      dispatch(deleteAUser(userId))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = []

// Reducer
export default function users(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.allUsers
    case ADD_NEW_USER:
      return [...state, action.newUser]
    case DELETE_USER:
      return state.filter(user => user.id !== action.userId)
    default:
      return state
  }
}
