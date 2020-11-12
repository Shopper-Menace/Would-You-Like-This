import React, {Component} from 'react'
import axios from 'axios'

export default class SingleProduct extends Component {
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
