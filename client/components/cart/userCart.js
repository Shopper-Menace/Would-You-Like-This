import React from 'react'
import {connect} from 'react-redux'

const UserCart = props => {
  console.log(props.cart, 'USER CART')

  return (
    <div>
      USER CART
      {/* {!props.cart ? (
        <div>No Items</div>
      ) : (
        props.cart.map((item) => <div>{item}</div>)
      )} */}
    </div>
  )
}

const mapState = state => ({
  cart: state.cart
})

export default connect(mapState, null)(UserCart)

// export default UserCart
