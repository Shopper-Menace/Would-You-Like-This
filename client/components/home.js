import React, {Component} from 'react'
import RecentlyAdded from './recentlyAdded'
import ViewUsers from './viewUsers'
import Featured from './featured'

class Home extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="home">
        <h1>Welcome Friend</h1>
        <ViewUsers />
        <RecentlyAdded />
        <Featured />
      </div>
    )
  }
}

export default Home
