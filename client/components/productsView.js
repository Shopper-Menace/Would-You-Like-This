import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Products extends Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
    this.getProducts = this.getProducts.bind(this)
  }
  async getProducts() {
    const prods = await axios.get('api/products')
    this.setState({
      products: prods.data
    })
  }
  render() {
    // Makes it getProducts on load (temp fix till we add redux)
    if (this.state.products.length === 0) {
      this.getProducts()
    }
    return (
      <div className="grid">
        {this.state.products.map(product => {
          return (
            <div key={product.id} className="cell">
              <Link to={`/products/${product.id}`}>
                <h5 className="productname">{product.name}</h5>
              </Link>
              <img className="img" src={product.imageUrl} />
              <div>{product.price}</div>
              <div>{product.description}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Products
