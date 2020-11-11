import React from 'react'
import {connect} from 'react-redux'

const UserCart = props => {
  return (
    <div>
      {!props.cart ? (
        <div>No Items</div>
      ) : (
        props.cart.map(item => <div>{item}</div>)
      )}
    </div>
  )
}

// const mapState = (state) => ({
//   cart: state.user.cart,
// })

// export default connect(mapState, null)(UserCart)

export default UserCart
