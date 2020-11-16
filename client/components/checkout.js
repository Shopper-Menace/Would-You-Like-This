import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
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

    this.setState = {
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      aptNumber: '',
      city: '',
      state: '',
      zip: '',
      tel: ''
    }
  }

  render() {
    const {order} = this.props
    console.log('order in checkout view', this.props)
    return (
      <div>
        <h3>You're about to be the proud owner of this cool stuff!</h3>
        <p>We just need some shipping info so we can send it to you</p>
        <div>
          <form id="shipping-form">
            <div>
              <label htmlFor="first-name">First Name</label>
              <input
                onChange={this.handleChange}
                type="text"
                firstName="first-name"
                placeholder="Joe"
              />
            </div>
            <div>
              <label htmlFor="last-name">Last Name</label>
              <input
                onChange={this.handleChange}
                type="text"
                lastName="last-name"
                placeholder="Mama"
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                onChange={this.handleChange}
                type="text"
                address="address"
                placeholder="123 123rd St."
              />
            </div>
            <div>
              <label htmlFor="address2">Address cont.</label>
              <input
                onChange={this.handleChange}
                type="text"
                address-2="address2"
              />
            </div>
            <div>
              <label htmlFor="aptNumber">Apt or Suite No.</label>
              <input
                onChange={this.handleChange}
                type="text"
                aptNumber="aptNumber"
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                onChange={this.handleChange}
                type="text"
                city="city"
                placeholder="Emerald City"
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <input
                onChange={this.handleChange}
                type="text"
                state="state"
                placeholder="AK"
              />
            </div>
            <div>
              <label htmlFor="zip">Zip</label>
              <input
                onChange={this.handleChange}
                type="tel"
                zip="zip"
                min="00001"
                max="99999"
                placeholder="12345"
              />
            </div>
            <div>
              <label htmlFor="tel">Phone Number</label>
              <input
                onChange={this.handleChange}
                type="tel"
                id="tel"
                name="tel"
                placeholder="555-555-5555"
              />
            </div>
          </form>
        </div>
        <Link to="/cart/confirmation">
          <button className="submit" type="submit" value="submit">
            Place my Order
          </button>
        </Link>
      </div>
    )
  }
}

export default Checkout

// const mapStateToProps = state => ({
//   order: state.user.orders.filter(
//     order => order.fulfillmentStatus === 'Cart'
//   )[0]
// })

// export default connect(mapStateToProps, null)(Checkout)
