import React, {useState} from 'react'
import {connect} from 'react-redux'
import {removeFromLocal} from '../../store'
import {Link} from 'react-router-dom'

const GuestCart = ({handleRemove}) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))
  let cartTotal = 0
  return !cart.length ? (
    <div>No Items</div>
  ) : (
    <div>
      GUEST CART
      {cart.map(item => {
        cartTotal += item[3]
        return (
          <div key={item[0]}>
            <h5>Category: {item[1]}</h5>
            <h3>
              {item[2]} Price: ${item[3] / 100}
            </h3>
            <img src={item[5]} />
            <div>{item[4]}</div>
            <button onClick={() => handleRemove(item)}>
              {' '}
              Remove from cart
            </button>
          </div>
        )
      })}
      <h5>Your total is: ${cartTotal / 100}</h5>
      <Link to={{pathname: '/cart/checkout', state: {cartTotal}}}>
        <button>Go to Checkout</button>
      </Link>
    </div>
  )
}

const mapDispatch = dispatch => ({
  handleRemove: item => dispatch(removeFromLocal(item))
})

export default connect(null, mapDispatch)(GuestCart)
