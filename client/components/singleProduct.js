import React, {Component} from 'react'
import axios from 'axios'
import {addToCart} from '../store'
import {connect} from 'react-redux'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      product: {}
    }
    this.getSingleProduct = this.getSingleProduct.bind(this)
  }

  async getSingleProduct(productId) {
    const {data} = await axios.get(`/api/products/${productId}`)
    this.setState({
      product: data
    })
  }

  // componentDidMount(){
  //   this.getSingleProduct(this.state.product)
  // }

  render() {
    if (Object.keys(this.state.product).length === 0) {
      this.getSingleProduct(this.props.match.params.productId)
    }

    return (
      <div>
        <div />
        <div>{this.state.product.name}</div>
      </div>
    )
  }
}

//to get product the product id would be in the route and individual product is gotten with filter using id

const mapState = state => ({
  product: state.product,
  order: state.user.orders.filter(
    order => order.fulfillmentStatus === 'Cart'
  )[0]
})

const mapDispatch = dispatch => ({
  addToCart: (orderId, itemId) => dispatch(addToCart(orderId, itemId))
})

export default connect(mapState, mapDispatch)(SingleProduct)
