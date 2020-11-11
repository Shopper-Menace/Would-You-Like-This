import React, {useState} from 'react'

const GuestCart = () => {
  let tempCart = [
    [1, 'no shoes'],
    [2, 'no shirt'],
    [3, 'and i still get service']
  ]
  localStorage.setItem('cart', JSON.stringify(tempCart))

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))

  return !cart ? (
    <div>No Items</div>
  ) : (
    <div>
      GUEST CART
      {cart.map(item => <div>{item}</div>)}
    </div>
  )
}

export default GuestCart
