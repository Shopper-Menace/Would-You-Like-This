import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'
import {Link} from 'react-router-dom'
import {me} from '../store/user'
import {fetchFeatured} from '../store'

class Featured extends React.Component {
  componentDidMount() {
    this.props.fetchFeatured()
    this.props.loadUser()
  }

  render() {
    return (
      <div className="recently-added">
        <h2>Featured</h2>
        {this.props.featured.length > 0 ? (
          this.props.featured.map(product => {
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
                          await addToCart(
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
    )
  }
}
const mapStateToProps = state => ({
  featured: state.featured,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  addItemToCart: itemId => dispatch(addToCart(itemId)),
  loadUser: () => dispatch(me()),
  fetchFeatured: () => dispatch(fetchFeatured())
})

export default connect(mapStateToProps, mapDispatchToProps)(Featured)
