import React from 'react'
import {connect} from 'react-redux'
import GuestCart from './guestCart'
import UserCart from './userCart'

const Cart = props => {
  return (
    <div className="cart">{!props.user ? <GuestCart /> : <UserCart />}</div>
    // <div>
    //   <GuestCart />
    // </div>
  )
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState, null)(Cart)
