import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../store'
import RecentlyAdded from './recentlyAdded'
import Recommended from './recommended'
import Featured from './featured'

class Home extends Component {
  componentDidMount() {
    this.props.getProducts()
    console.log('props in component did mount', this.props)
  }

  render() {
    const {products} = this.props
    console.log('props in home view render', this.props)
    return (
      <div className="home">
        <h1>Welcome!</h1>
        <RecentlyAdded />
        <Featured />
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
