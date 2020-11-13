import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'
import {fetchAllProducts} from '../store'

class Products extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div className="viewallcontainer">
        <div className="viewallsidebar">
          <h1>WYLT Prime</h1>
        </div>
        <div className="productview">
          {this.props.products.map(product => {
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
                <div className="adminButtons">
                  <button className="edit" type="button">
                    Edit
                  </button>
                  <button className="delete" type="button">
                    Delete
                  </button>
                  <button className="setFeatured" type="button">
                    Set Featured
                  </button>
                  <button className="setRecommended" type="button">
                    Set Recommended
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

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  addItemToCart: itemId => dispatch(addToCart(itemId)),
  getProducts: () => dispatch(fetchAllProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)
