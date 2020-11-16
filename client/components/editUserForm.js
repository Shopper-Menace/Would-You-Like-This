import React from 'react'

class EditUserForm extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      isAdmin: '',
      orders: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const user = this.props.user

    this.setState({
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      orders: user.orders
    })
  }

  handleChange(event) {
    const {target: {name, value}} = event
    this.setState({[name]: value})
  }

  handleSubmit(event) {
    event.preventDefault()

    const userId = this.props.user.id

    this.props.updateThisUser(userId, this.state)
    this.setState({
      email: '',
      password: '',
      isAdmin: '',
      orders: this.props.user.orders
    })
  }

  render() {
    return (
      <div>
        <form id="edit-user-form" onSubmit={this.handleSubmit}>
          <label htmlFor="email">
            Edit Email Address:
            <input
              onChange={this.handleChange}
              value={this.state.email}
              name="email"
              type="text"
            />
          </label>
          <label htmlFor="password">
            Edit Password:
            <input
              onChange={this.handleChange}
              value={this.state.password}
              name="password"
              type="text"
            />
          </label>
          <label htmlFor="isAdmin">Is Admin?:</label>
          <select
            onChange={this.handleChange}
            value={this.state.featured}
            name="featured"
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

export default EditUserForm
