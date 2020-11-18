import React, {useState} from 'react'
import {connect} from 'react-redux'
import {removeFromLocal} from '../../store'
import {Link} from 'react-router-dom'

const GuestCart = ({handleRemove}) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))
  let cartTotal = 0
  return !cart.length ? (
    <div className="item">
      <h3>Nothing to see here</h3>
    </div>
  ) : (
    <div className="cart">
      {cart.map(item => {
        cartTotal += item[3]
        return (
          <div className="item" key={item[0]}>
            <h5>Category: {item[1]}</h5>
            <h3>
              {item[2]} Price: ${item[3] / 100}
            </h3>
            <img src={item[5]} />
            <div>{item[4]}</div>
            <button
              onClick={() => handleRemove(item)}
              className="removefromcart"
            >
              {' '}
              Remove from cart
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

const mapDispatch = dispatch => ({
  handleRemove: item => dispatch(removeFromLocal(item))
})

export default connect(null, mapDispatch)(GuestCart)
