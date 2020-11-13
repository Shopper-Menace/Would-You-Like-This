import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../store'

class EditProduct extends Component {
  handleSubmit(event) {
    event.preventDefault()
    this.props.editProduct()
  }
}

const mapStateToProps = state => ({
  product: state.product
})

const mapDispatchToProps = dispatch => ({
  editProduct: productId => dispatch(updateProduct(productId))
})
