import React, {useState} from 'react'

const GuestCart = () => {
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
          <button> placeholder remove from local cart</button>
        </div>
      ))}
    </div>
  )
}

export default GuestCart
