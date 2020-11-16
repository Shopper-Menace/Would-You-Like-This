import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import singleProduct from './components/singleProduct'

import {
  Login,
  Signup,
  UserHome,
  Home,
  Products,
  Cart,
  Checkout,
  ViewSingleUser,
  Confirmation
} from './components'

import {me, fetchAllProducts} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchAllProducts()
  }

  render() {
    // const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/cart/checkout" component={Checkout} />
        <Route exact path="/cart/confirmation" component={Confirmation} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:productId" component={singleProduct} />
        <Route exact path="/users-admin/:userId" component={ViewSingleUser} />
        <Route path="/home" component={Home} />

        {/* {isLoggedIn && (
          <Switch>
            <Route path="/home" component={Home} />
          </Switch>
        )} */}
        {/* Displays our Login component as a fallback */}
        <Redirect from="/" to="/home" />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.user.id
})

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
  fetchAllProducts: () => dispatch(fetchAllProducts())
})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
