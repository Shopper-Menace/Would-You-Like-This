import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCart, fetchSingleProduct, addToLocal} from '../store'

const Products = ({products, user, handleClick, addToLocal}) => {
  return (
    <div className="viewallcontainer">
      <div className="viewallsidebar">
        <h1>WYLT Prime</h1>
      </div>
      <div className="productview">
        {products.map(product => {
          const {id, imageUrl, name, price, description, category} = product
          return (
            <div key={id} className="prod">
              <div className="prodbox">
                <Link to={`/products/${id}`}>
                  <img className="prodimg" src={imageUrl} />
                </Link>
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

const mapStateToProps = state => ({
  products: state.products.products,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  addItemToCart: (orderId, itemId) => dispatch(addToCart(orderId, itemId)),
  handleClick: id => dispatch(fetchSingleProduct(id)),
  addToLocal: item => dispatch(addToLocal(item))
})
export default connect(mapStateToProps, mapDispatchToProps)(Products)
