import React, {Component} from 'react'
import RecentlyAdded from './recentlyAdded'
import Recommended from './recommended'
import ViewUsers from './viewUsers'
import Featured from './featured'
import {me} from '../store'
import {connect} from 'react-redux'

class Home extends Component {
  componentDidMount() {}

  render() {
    const user = this.props.user
    return (
      <div className="home">
        {this.props.user.id ? (
          <h1>Welcome {this.props.user.email}</h1>
        ) : (
          <h1>Welcome</h1>
        )}
        <ViewUsers user={user} />
        <RecentlyAdded />
        <Featured />
        <Recommended />
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadUser: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(Home)
