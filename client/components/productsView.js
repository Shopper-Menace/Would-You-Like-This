import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  deleteProduct,
  fetchAllProducts,
  me,
  addToCart,
  addToLocal
} from '../store'
import NewProductForm from './newProductForm'

class Products extends React.Component {
  constructor() {
    super()
    this.state = {
      showForm: false
    }
    this.toggleShow = this.toggleShow.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllProducts()
    this.props.loadUser()
  }

  toggleShow() {
    this.state.showForm
      ? this.setState({showForm: false})
      : this.setState({showForm: true})
  }

  render() {
    //variable to check if current user is an Admin

    const {user, destroyProduct, addToLocal, addItemToCart} = this.props
    const {isAdmin} = user

    return (
      <div className="viewallcontainer">
        <div className="viewallsidebar">
          <h1>WYLT Prime</h1>
        </div>
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
                <NewProductForm />
              </div>
            ) : (
              <button
                onClick={() => this.toggleShow()}
                className="add"
                type="button"
              >
                Add Product
              </button>
            )}
          </div>
        )}
        <div className="productview">
          {this.props.products.length > 0 ? (
            this.props.products.map(product => {
              return (
                <div key={product.id} className="prod">
                  <div className="prodbox">
                    <Link to={`/products/${product.id}`}>
                      <img className="prodimg" src={product.imageUrl} />
                    </Link>
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
                      <button className="setAsFeatured" type="button">
                        Set as Featured
                      </button>
                    </div>
                  )}

                  <div className="prodtext">
                    <Link to={`/products/${product.id}`}>
                      <h5 className="productname">{product.name}</h5>
                    </Link>
                    <div>{`$${product.price / 100}`}</div>

                    {!this.props.user.id ? (
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
                          Add to Cart
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          type="button"
                          onClick={async () => {
                            await addItemToCart(
                              this.props.user.orders.filter(
                                order => order.fulfillmentStatus === 'Cart'
                              )[0].id,
                              product.id
                            )
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  addItemToCart: (orderId, itemId) => dispatch(addToCart(orderId, itemId)),
  loadUser: () => dispatch(me()),
  fetchAllProducts: () => dispatch(fetchAllProducts()),
  destroyProduct: productId => dispatch(deleteProduct(productId)),
  addToLocal: itemArr => dispatch(addToLocal(itemArr))
})
export default connect(mapStateToProps, mapDispatchToProps)(Products)
