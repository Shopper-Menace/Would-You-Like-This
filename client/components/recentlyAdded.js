import React from 'react'
import {connect} from 'react-redux'
import {addToCart, addToLocal} from '../store/cart'
import {Link} from 'react-router-dom'
import {fetchRecentlyAdded} from '../store/recentlyadded'
import {me} from '../store/user'

class RecentlyAdded extends React.Component {
  componentDidMount() {
    this.props.fetchRecentlyAdded()
    this.props.loadUser()
  }

  render() {
    return (
      <div className="homeview">
        <div className="centerheader">
          <h1>Recently Added</h1>
        </div>

        <div className="homeprod">
          {this.props.recentlyadded.length > 0 ? (
            this.props.recentlyadded.map(product => {
              return (
                <div key={product.id} className="homecell">
                  <div>
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
                            this.props.addToLocal([
                              product.id,
                              product.category,
                              product.name,
                              product.price,
                              product.description,
                              product.imageUrl
                            ])
                          }
                        >
                          Add to Carts
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
  recentlyadded: state.recentlyadded,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  addItemToCart: itemId => dispatch(addToCart(itemId)),
  loadUser: () => dispatch(me()),
  fetchRecentlyAdded: () => dispatch(fetchRecentlyAdded()),
  addToLocal: itemArr => dispatch(addToLocal(itemArr))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyAdded)
