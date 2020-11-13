import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchCart} from '../store'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
// import Cart from './cart'

const NavbarComp = ({handleClick, isLoggedIn}) => {
  return (
    <div className="navbar">
      <img src="/favicon.ico" className="logo" />
      <Link to="/home">Home</Link>
      <div>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <button onClick={handleClick}>Logout</button>
              <Link to="/cart">
                <button>Your Cart</button>
              </Link>
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
              <Link to="/cart">
                <button>Your Cart</button>
              </Link>
              <Link to="/products">
                <button>View Products</button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
    // <Navbar bg="primary" variant="dark">
    //   <Navbar.Brand href="#home" />
    //   <Nav className="mr-auto">
    //     <Link to="/home">Home</Link>
    //     <Nav.Link href="#features">Features</Nav.Link>
    //     <Nav.Link href="#pricing">Pricing</Nav.Link>
    //   </Nav>
    //   <Form inline>
    //     <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    //     <Button variant="outline-light">Search</Button>
    //   </Form>
    //   <Link to="/cart">Your Cart</Link>
    // </Navbar>
  )
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NavbarComp)

/**
 * PROP TYPES
 */
NavbarComp.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
