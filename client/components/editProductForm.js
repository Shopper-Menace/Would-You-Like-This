import React from 'react'

class EditProductForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      category: '',
      price: '',
      imageUrl: '',
      featured: '',
      recommended: '',
      recentlyAdded: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const product = this.props.product

    this.setState({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      imageUrl: product.imageUrl,
      featured: product.featured,
      recommended: product.recommended,
      recentlyAdded: product.recentlyAdded
    })
  }

  handleChange(event) {
    const {target: {name, value}} = event
    this.setState({[name]: value})
  }

  //Save this for new thunk:
  handleSubmit(event) {
    event.preventDefault()

    const productId = this.props.product.id

    this.props.updateThisProduct(productId, this.state)
    this.setState({
      name: '',
      description: '',
      category: '',
      price: '',
      imageUrl: '',
      featured: '',
      recommended: '',
      recentlyAdded: ''
    })

    this.props.loadSingleProduct(productId)
  }

  render() {
    return (
      <div>
        <form id="edit-product-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">
            Edit Product Name:
            <input
              onChange={this.handleChange}
              value={this.state.name}
              name="name"
              type="text"
            />
          </label>
          <label htmlFor="description">
            Edit Product Description:
            <input
              onChange={this.handleChange}
              value={this.state.description}
              name="description"
              type="text"
            />
          </label>
          <label htmlFor="category">
            Edit Product Category:
            <input
              onChange={this.handleChange}
              value={this.state.category}
              name="category"
              type="text"
            />
          </label>
          <label htmlFor="price">
            Edit Product Price, $:
            <input
              onChange={this.handleChange}
              value={this.state.price}
              name="price"
              type="number"
            />
          </label>
          <label htmlFor="imageUrl">
            Edit Image Url:
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
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label htmlFor="featured">Recently Added?:</label>
          <select
            onChange={this.handleChange}
            value={this.state.recentlyAdded}
            name="recentlyAdded"
            type="text"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <button className="submit" type="submit" value="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default EditProductForm
