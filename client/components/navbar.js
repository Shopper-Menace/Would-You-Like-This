import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
// import Cart from './cart'

const NavbarComp = ({handleClick, isLoggedIn}) => {
  return (
    <div className="navbar">
      <img src="/favicon.ico" className="logo" />
      <button>
        <Link to="/home">Home</Link>
      </button>
      <div>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <button onClick={handleClick}>Logout</button>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/signup">
                <button>Signup</button>
              </Link>
            </div>
          )}
        </nav>
      </div>
      <div>
        <Link to="/cart">
          <button>Your Cart</button>
        </Link>
        <Link to="/products">
          <button>View Products</button>
        </Link>
      </div>
    </div>
  )
}

const mapState = state => ({
  isLoggedIn: !!state.user.id
})

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout())
  }
})

export default connect(mapState, mapDispatch)(NavbarComp)

/**
 * PROP TYPES
 */
NavbarComp.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
