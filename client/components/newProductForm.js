import React from 'react'
import {addProduct} from '../store/products'
import {connect} from 'react-redux'

export class NewProductForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      category: '',
      price: '',
      imageUrl: undefined,
      featured: false,
      recommended: false,
      recentlyAdded: true
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const {target: {name, value}} = event
    this.setState({[name]: value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addNewProduct(this.state)
    this.setState({
      name: '',
      description: '',
      category: '',
      price: '',
      imageUrl: undefined,
      featured: false,
      recommended: false,
      recentlyAdded: true
    })
  }

  render() {
    return (
      <div>
        <form id="edit-product-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">
            Product Name:
            <input
              onChange={this.handleChange}
              value={this.state.name}
              name="name"
              type="text"
            />
          </label>
          <label htmlFor="description">
            Product Description:
            <input
              onChange={this.handleChange}
              value={this.state.description}
              name="description"
              type="text"
            />
          </label>
          <label htmlFor="category">
            Product Category:
            <input
              onChange={this.handleChange}
              value={this.state.category}
              name="category"
              type="text"
            />
          </label>
          <label htmlFor="price">
            Product Price, $:
            <input
              onChange={this.handleChange}
              value={this.state.price}
              name="price"
              type="number"
            />
          </label>
          <label htmlFor="imageUrl">
            Product Image Url:
            <input
              onChange={this.handleChange}
              value={this.state.imageUrl}
              name="imageUrl"
              type="text"
            />
          </label>
          <label htmlFor="featured">Featured?:</label>
          <select
            onChange={this.handleChange}
            value={this.state.featured}
            name="featured"
            type="text"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <button className="submit" type="submit" value="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  addNewProduct: product => dispatch(addProduct(product))
})

export default connect(null, mapDispatch)(NewProductForm)
