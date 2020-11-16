import React from 'react'
import {connect} from 'react-redux'

const Checkout = ({order}) => {
  console.log('order in checkout component', order)

  return (
    <div>
      <h1>Hey, let's check out, bro!</h1>
    </div>
  )
}

const mapStateToProps = state => ({
  order: state.user.orders.filter(
    order => order.fulfillmentStatus === 'Cart'
  )[0]
})

export default connect(mapStateToProps, null)(Checkout)
