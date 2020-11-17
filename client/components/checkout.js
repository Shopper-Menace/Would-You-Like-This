import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {handleCheckout} from '../store'

//4 things:
//change order status to pending = adding functionality in handleSubmit -> store
//make new order with status of cart
//clear the cart/reset state
//redirect to confirmation after all data is submitted/validated

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      aptNumber: '',
      city: '',
      state: '',
      zip: '',
      tel: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const {target: {name, value}} = event
    this.setState({[name]: value})
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.handleCheckout({
      ...this.state,
      totalCost: this.props.location.state.cartTotal
    })

    this.setState = {
      firstName: '',
      lastName: '',
      address: '',
      aptNumber: '',
      city: '',
      state: '',
      zip: '',
      tel: ''
    }
    window.localStorage.clear()
    if (!window.localStorage.cart) {
      window.localStorage.setItem('cart', JSON.stringify([]))
    }
  }

  render() {
    return (
      <div>
        <div>
          <h3>You're about to be the proud owner of this cool stuff!</h3>
          <p>We just need some shipping info so we can send it to you</p>
          <div>
            <form id="shipping-form" onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="first-name">First Name</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="firstName"
                  placeholder="Joe"
                  value={this.state.firstName}
                  required
                />
              </div>
              <div>
                <label htmlFor="last-name">Last Name</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="lastName"
                  placeholder="Mama"
                  value={this.state.lastName}
                  required
                />
              </div>
              s
              <div>
                <label htmlFor="address">Address</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="address"
                  placeholder="123 123rd St."
                  value={this.state.address}
                  required
                />
              </div>
              <div>
                <label htmlFor="aptNumber">Apt or Suite No.</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="aptNumber"
                  value={this.state.aptNumber}
                />
              </div>
              <div>
                <label htmlFor="city">City</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="city"
                  value={this.state.city}
                  placeholder="Emerald City"
                  required
                />
              </div>
              <div>
                <label htmlFor="state">State</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="state"
                  placeholder="AK"
                  value={this.state.state}
                  maxLength="2"
                  required
                />
              </div>
              <div>
                <label htmlFor="zip">Zip</label>
                <input
                  onChange={this.handleChange}
                  type="number"
                  name="zip"
                  id="zip"
                  min="00001"
                  value={this.state.zip}
                  max="99999"
                  placeholder="12345"
                  required
                />
              </div>
              <div>
                <label htmlFor="tel">Phone Number</label>
                <input
                  onChange={this.handleChange}
                  type="tel"
                  value={this.state.tel}
                  id="tel"
                  name="tel"
                  placeholder="555-555-5555"
                  required
                />
              </div>
              <button className="submit" type="submit" value="submit">
                Place my Order
              </button>
            </form>
          </div>
        </div>
        <h3>Total: ${this.props.location.state.cartTotal / 100}</h3>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleCheckout: order => dispatch(handleCheckout(order))
})

export default connect(null, mapDispatchToProps)(Checkout)
