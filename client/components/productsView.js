import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'

class Products extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     products: []
  //   }
  //   this.getProducts = this.getProducts.bind(this)
  // }
  // async getProducts() {
  //   const prods = await axios.get('api/products')
  //   this.setState({
  //     products: prods.data
  //   })
  // }
  render() {
    // Makes it getProducts on load (temp fix till we add redux)
    // if (this.state.products.length === 0) {
    //   this.getProducts()
    // }
    console.log('props in allproducts view: ', this.props)
    return (
      <div className="viewallcontainer">
        <div className="viewallsidebar">
          <h1>WYLT Prime</h1>
        </div>
        <div className="productview">
          {this.state.products.map(product => {
            return (
              <div key={product.id} className="prod">
                <div className="prodbox">
                  <Link to={`/products/${product.id}`}>
                    <img className="prodimg" src={product.imageUrl} />
                  </Link>
                </div>
                <div className="prodtext">
                  <Link to={`/products/${product.id}`}>
                    <h5 className="productname">{product.name}</h5>
                  </Link>
                  <div>{`$${product.price / 100}`}</div>
                  <button
                    onClick={async () => {
                      await this.props.addItemToCart(product.id)
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = reduxState => ({
  products: reduxState.products
})

const mapDispatchToProps = dispatch => ({
  addItemToCart: itemId => dispatch(addToCart(itemId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)
