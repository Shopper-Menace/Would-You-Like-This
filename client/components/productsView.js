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
      showForm: false,
      filter: 'All'
    }
    this.toggleShow = this.toggleShow.bind(this)
    this.handleChange = this.handleChange.bind(this)
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

  handleChange(event) {
    this.setState({filter: event.target.value})
  }

  render() {
    //variable to check if current user is an Admin
    console.log('products view', products)

    const {filter} = this.state
    const products = this.props.products.filter(product => {
      if (filter === 'All') return product
      if (filter === 'Luggage') return product.category === 'Luggage'
      if (filter === 'Championship Merch')
        return product.category === 'Championship Merch'
      if (filter === 'Lost and Found')
        return product.category === 'Lost and Found'
    })

    const {user, destroyProduct, addToLocal, addItemToCart} = this.props
    const {isAdmin} = user

    return (
      <div className="viewallcontainer">
        <div className="viewallsidebar">
          <h1>WYLT Prime</h1>
          <div id="product-filter">
            <label htmlFor="productFilter">Choose Category:</label>
            <select
              onChange={this.handleChange}
              value={filter}
              name="productFilter"
            >
              <option>All</option>
              <option>Luggage</option>
              <option>Championship Merch</option>
              <option>Lost and Found</option>
            </select>
          </div>
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
            <Link to="/users-admin">
              <button type="button">View Users</button>
            </Link>
          </div>
        )}
        <div className="productview">
          {products.length > 0 ? (
            products.map(product => {
              return (
                <div key={product.id} className="prod">
                  <div className="prodbox">
                    <Link to={`/products/${product.id}`}>
                      <img className="prodimg" src={product.imageUrl} />
                    </Link>
                  </div>

                  {isAdmin && (
                    <div className="adminButtons">
                      <Link to={`/products/${product.id}`}>
                        <button className="edit" type="button">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="delete"
                        type="button"
                        onClick={() => destroyProduct(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  <div className="prodtext">
                    <Link to={`/products/${product.id}`}>
                      <h5 className="productname">{product.name}</h5>
                    </Link>
                    {product.featured && (
                      <h6 className="isFeatured">*Featured Product*</h6>
                    )}
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
