import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_USERS = 'SET_USERS'

/**
 * ACTION CREATORS
 */
const setUsers = allUsers => ({
  type: SET_USERS,
  allUsers
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

const initialState = []

// Reducer
export default function users(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.allUsers
    default:
      return state
  }
}
