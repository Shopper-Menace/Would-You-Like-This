import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser, updateUser, deleteUser} from '../store'
import {Link} from 'react-router-dom'
import EditUserForm from './editUserForm'

class ViewSingleUser extends React.Component {
  constructor() {
    super()
    this.state = {
      showForm: false
    }
    this.toggleShow = this.toggleShow.bind(this)
  }

  componentDidMount() {
    try {
      const {userId} = this.props.match.params
      this.props.loadSingleUser(userId)
    } catch (error) {
      console.error(error)
    }
  }

  toggleShow() {
    this.state.showForm
      ? this.setState({showForm: false})
      : this.setState({showForm: true})
  }

  render() {
    const user = this.props.singleUser
    return (
      <div id="single-user">
        <div id="user-info">
          <h1>{user.email}'s Profile</h1>
          <h4>Member since: {user.createdAt}</h4>
        </div>
        <div id="user-orders" />
        <div id="edit-and-delete">
          {this.state.showForm ? (
            <div id="form-loaded">
              <button
                className="hide"
                type="submit"
                value="hide"
                onClick={() => this.toggleShow()}
              >
                Hide Form
              </button>
              <EditUserForm
                user={user}
                updateThisUser={this.props.updateThisUser}
              />
            </div>
          ) : (
            <button
              className="hide"
              type="submit"
              value="hide"
              onClick={() => this.toggleShow()}
            >
              Edit User
            </button>
          )}
          <Link to="/home">
            <button
              className="delete"
              type="submit"
              value="delete"
              onClick={() => this.props.destroyUser(user.id)}
            >
              Ban User
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  singleUser: state.userprofile
})

const mapDispatch = dispatch => ({
  loadSingleUser: id => dispatch(fetchSingleUser(id)),
  destroyUser: userId => dispatch(deleteUser(userId)),
  updateThisUser: (userId, newInfo) => dispatch(updateUser(userId, newInfo))
})

export default connect(mapState, mapDispatch)(ViewSingleUser)
