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
        products.map(item => {
          const {category, description, id, imageUrl, name, price} = item
          return (
            <div key={id}>
              <h5>Category: {category}</h5>
              <h3>
                {name} Price: {price}
              </h3>
              <img src={imageUrl} />
              <div>{description}</div>
              <button>Remove {name} from cart</button>
            </div>
          )
        })
      )}
    </div>
  )
}

const mapState = state => ({
  products: state.user.orders.filter(
    order => order.fulfillmentStatus === 'Cart'
  )[0].products
})

// const mapDispatch = dispatch => ({
//   removeFromCart: (id) => dispatch(removeFromCart(id))
// })

export default connect(mapState, null)(UserCart)

// export default UserCart
