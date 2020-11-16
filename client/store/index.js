import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import users from './users'
import cart from './cart'
import products from './products'
import product from './product'
import recentlyadded from './recentlyadded'
import featured from './featured'

const reducer = combineReducers({
  user,
  users,
  cart,
  products,
  product,
  recentlyadded,
  featured
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './cart'
export * from './products'
export * from './product'
export * from './users'
export * from './recentlyadded'
export * from './featured'
