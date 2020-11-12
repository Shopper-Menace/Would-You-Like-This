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
    console.log('DATA IN getSingleProduct: ', data)
  }

  // componentDidMount(){
  //   this.getSingleProduct(this.state.product)
  // }

  render() {
    if (this.state.product) return <h1>Waddup</h1>
  }
}
