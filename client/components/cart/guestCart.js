import React, {useState} from 'react'
import {connect} from 'react-redux'
import {removeFromLocal} from '../../store'

const GuestCart = ({handleRemove}) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))

  return !cart.length ? (
    <div>No Items</div>
  ) : (
    <div>
      GUEST CART
      {cart.map(item => (
        <div key={item[0]}>
          <h5>Category: {item[1]}</h5>
          <h3>
            {item[2]} Price: {item[3]}
          </h3>
          <img src={item[5]} />
          <div>{item[4]}</div>
          <button onClick={() => handleRemove(item)}> Remove from cart</button>
        </div>
      ))}
    </div>
  )
}

const mapDispatch = dispatch => ({
  handleRemove: item => dispatch(removeFromLocal(item))
})

export default connect(null, mapDispatch)(GuestCart)
