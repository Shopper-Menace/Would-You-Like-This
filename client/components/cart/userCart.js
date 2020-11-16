import React from 'react'
import {connect} from 'react-redux'
import {removeFromCart} from '../../store'
import {Link} from 'react-router-dom'

const UserCart = ({order, removeFromCart}) => {
  let cartTotal = 0
  return (
    <div>
      USER CART
      {!order.products.length ? (
        <div>No Items</div>
      ) : (
        order.products.map(item => {
          const {category, description, id, imageUrl, name, price} = item
          cartTotal += price
          return (
            <div key={id}>
              <h5>Category: {category}</h5>
              <h3>
                {name} Price: ${price / 100}
              </h3>
              <img src={imageUrl} />
              <div>{description}</div>
              <button onClick={() => removeFromCart(order.id, item.id)}>
                Remove {name} from cart
              </button>
            </div>
          )
        })
      )}
      <h5>Your total is: ${cartTotal / 100}</h5>
      <Link to="/checkout">
        <button>Go to Checkout</button>
      </Link>
    </div>
  )
}

const mapState = state => ({
  order: state.user.orders.filter(
    order => order.fulfillmentStatus === 'Cart'
  )[0]
})

const mapDispatch = dispatch => ({
  removeFromCart: (orderId, itemId) => dispatch(removeFromCart(orderId, itemId))
})

export default connect(mapState, mapDispatch)(UserCart)
