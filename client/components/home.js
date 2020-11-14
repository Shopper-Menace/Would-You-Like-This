import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../store'
import RecentlyAdded from './recentlyAdded'
import Recommended from './recommended'

class Home extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {products} = this.props
    return (
      <div className="home">
        <h1>Welcome!</h1>
        <RecentlyAdded />
        <Recommended />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(fetchAllProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
