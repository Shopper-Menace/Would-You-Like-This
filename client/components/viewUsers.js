import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers, deleteUser} from '../store'
import {Link} from 'react-router-dom'

class ViewUsers extends React.Component {
  constructor() {
    super()
    this.state = {
      showUsers: false
    }
    this.toggleShow = this.toggleShow.bind(this)
  }

  componentDidMount() {
    this.props.getUsers()
  }

  toggleShow() {
    this.state.showUsers
      ? this.setState({showUsers: false})
      : this.setState({showUsers: true})
  }

  render() {
    const users = this.props.users

    return (
      <div id="all-users">
        <div id="all-users-list">
          {this.state.showUsers ? (
            <div id="list-loaded">
              <button
                className="hide"
                type="submit"
                value="hide"
                onClick={() => this.toggleShow()}
              >
                Hide All Users
              </button>
              <table>
                <tbody>
                  <tr>
                    <th>User ID</th>
                    <th>Email Address</th>
                    <th>Profile</th>
                    <th>Ban User?</th>
                  </tr>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>
                        <Link to={`/users-admin/${user.id}`}>View Profile</Link>
                      </td>
                      <td>
                        <button
                          id="ban"
                          type="button"
                          onClick={() => this.props.destroyUser(user.id)}
                        >
                          Ban
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div id="list-not-loaded">
              <button
                className="show"
                type="submit"
                value="show"
                onClick={() => this.toggleShow()}
              >
                Show All Users
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(fetchUsers()),
    destroyUser: userId => dispatch(deleteUser(userId))
  }
}

export default connect(mapState, mapDispatch)(ViewUsers)
