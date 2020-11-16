import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/users'

class ViewUsers extends React.Component {
  constructor() {
    super()
    this.state = {
      showForm: false
    }
    this.toggleShow = this.toggleShow.bind(this)
  }

  componentDidMount() {
    this.props.getUsers()
  }

  toggleShow() {
    this.state.showForm
      ? this.setState({showForm: false})
      : this.setState({showForm: true})
  }

  render() {
    console.log('view all users props', this.props)

    return (
      <div id="all-users">
        <h1>VIEW ALL USERS</h1>
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
