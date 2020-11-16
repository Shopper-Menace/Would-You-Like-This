import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store'
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
    const isAdmin = this.props.user.isAdmin

    return (
      <div id="all-users">
        {isAdmin && (
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
                    </tr>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <Link to={`/users-admin/${user.id}`}>
                          <td>View Profile</td>
                        </Link>
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
        )}
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
    getUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(ViewUsers)
