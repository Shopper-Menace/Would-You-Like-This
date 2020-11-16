import React from 'react'
import {connect} from 'react-redux'

const Checkout = ({order}) => {
  console.log('order in checkout component', order)

  return (
    <div>
      <h3>You're about to be the proud owner of this cool stuff!</h3>
      <p>We just need some shipping info so we can send it to you</p>
    </div>
  )
}

const mapStateToProps = state => ({
  order: state.user.orders.filter(
    order => order.fulfillmentStatus === 'Cart'
  )[0]
})

export default connect(mapStateToProps, null)(Checkout)
