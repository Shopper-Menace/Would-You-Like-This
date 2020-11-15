import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {addToCart} from '../store/cart'
import {me} from '../store/user'
import {deleteProduct, updateExistingProduct} from '../store/products'
import EditProductForm from './editProductForm'

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

  componentDidMount() {
    try {
      this.props.loadUser()
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    // Makes it getProducts on load (temp fix till we add redux)

    if (this.state.products.length === 0) {
      this.getProducts()
    }

    //variable to check if current user is an Admin
    const isAdmin = this.props.user.isAdmin
    const destroyProduct = this.props.destroyProduct

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
                    type="button"
                    onClick={async () => {
                      await this.props.addItemToCart(product.id)
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
                {isAdmin && (
                  <div className="adminButtons">
                    <button className="edit" type="button">
                      Edit
                    </button>
                    <button
                      className="delete"
                      type="button"
                      onClick={() => destroyProduct(product.id)}
                    >
                      Delete
                    </button>
                    <button className="setRecentlyAdded" type="button">
                      Set as Recently Added
                    </button>
                    <button className="setAsFeatured" type="button">
                      Set as Featured
                    </button>
                  </div>
                )}

              </div>
              <div className="prodtext">
                <Link to={`/products/${id}`} onClick={() => handleClick(id)}>
                  <h5 className="productname">{name}</h5>
                </Link>
                <div>{`$${price / 100}`}</div>
                {!user.id ? (
                  <div>
                    <button
                      onClick={() =>
                        addToLocal([
                          id,
                          category,
                          name,
                          price,
                          description,
                          imageUrl
                        ])
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={async () => {
                        await addItemToCart(
                          user.orders.filter(
                            order => order.fulfillmentStatus === 'Cart'
                          )[0].id,
                          id
                        )
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
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


const mapStateToProps = reduxState => ({
  products: reduxState.products,
  user: reduxState.user
})

const mapDispatchToProps = dispatch => ({
  addItemToCart: itemId => dispatch(addToCart(itemId)),
  loadUser: () => dispatch(me()),
  destroyProduct: productId => dispatch(deleteProduct(productId)),
  editProduct: productId => dispatch(updateExistingProduct(productId))

})
export default connect(mapStateToProps, mapDispatchToProps)(Products)
