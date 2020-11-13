import React from 'react'
import {connect} from 'react-redux'
import {removeFromCart} from '../../store'

const UserCart = ({order, removeFromCart}) => {
  return (
    <div>
      USER CART
      {!order.products.length ? (
        <div>No Items</div>
      ) : (
        order.products.map(item => {
          const {category, description, id, imageUrl, name, price} = item
          return (
            <div key={id}>
              <h5>Category: {category}</h5>
              <h3>
                {name} Price: {price}
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
