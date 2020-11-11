import React from 'react'

const Cart = props => {
  //   const cart = [{'-shorts': 17}, {'t-shirt': 20}, {'-sketchers': 45}]
  //   console.log(JSON.stringify(cart), 'CART')
  const {cart} = props
  const testCart = localStorage.setItem(`cart`, JSON.stringify(''))

  //to add to cart with local storage:
  //if cart already has one item, then the local storage has one key/value pair for that item
  //when we want to add another item to the cart in local storage, the redux cart would be an object with two product sub-objects
  //question is: how would we know which product is the new product that we want to add to the local storage?

  //one way to approach this would be to simply clear the cart and re - set everything with localStorage.clear() and then do for (let key in reduxCart) { localStorage.setItem(key, JSON.stringify(reduxCart.key))}

  const localCart = !JSON.parse(localStorage.getItem('cart'))
    ? 'No Items'
    : JSON.parse(localStorage.getItem('cart'))

  return !props.user ? <div>{localCart}</div> : <div>User Cart</div>
}

export default Cart
