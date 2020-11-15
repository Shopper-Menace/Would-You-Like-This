import React from 'react'
import {connect} from 'react-redux'
import GuestCart from './guestCart'
import UserCart from './userCart'

const Cart = ({user}) => {
  return <div className="cart">{!user.id ? <GuestCart /> : <UserCart />}</div>
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState, null)(Cart)
