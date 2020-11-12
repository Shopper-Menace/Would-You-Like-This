import React from 'react'
import {connect} from 'react-redux'

const UserCart = ({products}) => {
  console.log(products)
  return (
    <div>
      USER CART
      {!products.length ? (
        <div>No Items</div>
      ) : (
        products.map(item => <div>{item.price}</div>)
      )}
    </div>
  )
}

const mapState = state => ({
  products: state.user.orders.filter(
    order => order.fulfillmentStatus === 'Cart'
  )[0].products
})

export default connect(mapState, null)(UserCart)

// export default UserCart
