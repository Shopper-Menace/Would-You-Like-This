import React, {Component} from 'react'
import axios from 'axios'

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
      <div className="viewallcontainer">
        <div className="viewallsidebar" />
        <div className="productview">
          {this.state.products.map(product => {
            return (
              <div key={product.id}>
                <div>
                  <img className="prodimg" src={product.imageUrl} />
                </div>
                <div>
                  <h5 className="productname">{product.name}</h5>
                  <div>{`$${product.price / 100}`}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Products
