import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
// import Cart from './cart'

const NavbarComp = ({handleClick, isLoggedIn}) => (
  // <div className="navbar">
  //   <div className="auth">
  //     <h1>BOILERMAKER</h1>
  //   </div>
  //   <div className="auth">
  //     <nav>
  //       {isLoggedIn ? (
  //         <div>
  //           {/* The navbar will show these links after you log in */}
  //           <Link to="/home">Home</Link>
  //           <a href="#" onClick={handleClick}>
  //             Logout
  //           </a>
  //         </div>
  //       ) : (
  //         <div>
  //           {/* The navbar will show these links before you log in */}
  //           <Link to="/login">Login</Link>
  //           <Link to="/signup">Sign Up</Link>
  //         </div>
  //       )}
  //     </nav>
  //   </div>
  //   <hr />
  // </div>
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home" />
    <Nav className="mr-auto">
      <Link to="/home">Home</Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
    <Link to="/cart">Your Cart</Link>
  </Navbar>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
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
