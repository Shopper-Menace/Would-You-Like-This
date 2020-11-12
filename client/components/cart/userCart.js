import React from 'react'
import {connect} from 'react-redux'

const UserCart = props => {
  return (
    <div>
      USER CART
      {!props.cart ? (
        <div>No Items</div>
      ) : (
        props.cart.map(item => <div>{item}</div>)
      )}
    </div>
  )
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState, null)(UserCart)

// export default UserCart
