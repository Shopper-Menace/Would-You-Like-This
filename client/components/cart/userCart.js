import React from 'react'
import {connect} from 'react-redux'
import {removeFromCart} from '../../store'
import {Link} from 'react-router-dom'

const UserCart = ({order, removeFromCart}) => {
  let cartTotal = 0
  console.log(order)
  return !order.products.length ? (
    <div className="item">
      <h3>Nothing to see here</h3>
    </div>
  ) : (
    <div classNamie="cart">
      {order.products.map(item => {
        const {category, description, id, imageUrl, name, price} = item
        cartTotal += price
        return (
          <div key={id} className="item">
            <h5>Category: {category}</h5>
            <h3>
              {name} Price: ${price / 100}
            </h3>
            <img src={imageUrl} />
            <div>{description}</div>
            <button
              onClick={() => removeFromCart(order.id, item.id)}
              className="removefromcart"
            >
              Remove {name} from cart
            </button>
          </div>
        )
      })}
      <div className="checkoutbutton">
        <h5>Your total is: ${cartTotal / 100}</h5>
        <Link to={{pathname: '/cart/checkout', state: {cartTotal}}}>
          <button>Go to Checkout</button>
        </Link>
      </div>
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
