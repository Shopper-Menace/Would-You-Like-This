import React from 'react'
import {connect} from 'react-redux'

const Checkout = ({order}) => {
  return (
    <div>
      <h1>Hey, let's check out, bro!</h1>
    </div>
  )
}

const mapState = state => ({
  order: state.user.orders.filter(
    order => order.fulfillmentStatus === 'Cart'
  )[0]
})

export default connect(mapState)(Checkout)
