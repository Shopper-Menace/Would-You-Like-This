import React from 'react'
import {addToCart} from '../store'
import {connect} from 'react-redux'

const SingleProduct = ({product, user, addToCart}) => {
  const {category, description, id, imageUrl, name, price} = product
  return (
    <div key={id}>
      <h5>Category: {category}</h5>
      <h3>
        {name} Price: {price / 100}
      </h3>
      <img src={imageUrl} />
      <div>{description}</div>
      <button
        onClick={() =>
          addToCart(
            user.orders.filter(order => order.fulfillmentStatus === 'Cart')[0],
            id,
            id
          )
        }
      >
        Add to cart
      </button>
    </div>
  )
}

//to get product the product id would be in the route and individual product is gotten with filter using id

const mapState = state => ({
  product: state.products.product,
  user: state.user
})

const mapDispatch = dispatch => ({
  addToCart: (orderId, itemId) => dispatch(addToCart(orderId, itemId))
})

export default connect(mapState, mapDispatch)(SingleProduct)
