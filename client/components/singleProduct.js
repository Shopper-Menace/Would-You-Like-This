import React from 'react'
import {connect} from 'react-redux'
import {
  addToCart,
  addToLocal,
  fetchSingleProduct,
  updateProduct,
  deleteProduct
} from '../store'
import EditProductForm from './editProductForm'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      showForm: false
    }
    this.toggleShow = this.toggleShow.bind(this)
  }

  componentDidMount() {
    try {
      const productId = this.props.match.params.productId
      this.props.loadSingleProduct(productId)
    } catch (error) {
      console.error(error)
    }
  }

  toggleShow() {
    this.state.showForm
      ? this.setState({showForm: false})
      : this.setState({showForm: true})
  }

  // const {category, description, id, imageUrl, name, price} = product

  render() {
    const {
      product,
      user,
      isAdmin,
      destroyProduct,
      addToCart,
      addToLocal
    } = this.props

    console.log(product)

    return (
      <div className="singleProduct">
        {isAdmin && (
          <div>
            {this.state.showForm ? (
              <div>
                <button
                  onClick={() => this.toggleShow()}
                  className="hide"
                  type="button"
                >
                  Hide Form
                </button>
                <EditProductForm
                  product={product}
                  updateThisProduct={this.props.updateThisProduct}
                  loadSingleProduct={this.props.loadSingleProduct}
                />
              </div>
            ) : (
              <button
                onClick={() => this.toggleShow()}
                className="edit"
                type="button"
              >
                Edit Product
              </button>
            )}

            <button
              className="delete"
              type="button"
              onClick={() => destroyProduct(product.id)}
            >
              Delete
            </button>
            <button className="setAsFeatured" type="button">
              Set as Featured
            </button>
          </div>
        )}

        <div className="singleProductDiv">
          <h5>Category: {product.category}</h5>
          <h3>
            {product.name} Price: ${product.price / 100}
          </h3>
          <img src={product.imageUrl} />
          <div>{product.description}</div>
          {!user.id ? (
            <div>
              <button
                type="button"
                onClick={() =>
                  addToLocal([
                    product.id,
                    product.category,
                    product.name,
                    product.price,
                    product.description,
                    product.imageUrl
                  ])
                }
              >
                Add to cart
              </button>
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={() =>
                  addToCart(
                    user.orders.filter(
                      order => order.fulfillmentStatus === 'Cart'
                    )[0].id,
                    product.id
                  )
                }
              >
                Add to cart
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

//to get product the product id would be in the route and individual product is gotten with filter using id

const mapState = state => ({
  product: state.product,
  user: state.user
})

const mapDispatch = dispatch => ({
  loadSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
  updateThisProduct: (productId, newInfo) =>
    dispatch(updateProduct(productId, newInfo)),
  destroyProduct: productId => dispatch(deleteProduct(productId)),
  addToCart: (orderId, itemId) => dispatch(addToCart(orderId, itemId)),
  addToLocal: prodAsArr => dispatch(addToLocal(prodAsArr))
})

export default connect(mapState, mapDispatch)(SingleProduct)
