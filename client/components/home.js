import React, {Component} from 'react'
import RecentlyAdded from './recentlyAdded'
import Recommended from './recommended'

class Home extends Component {
  render() {
    return (
      <div className="home">
        <h1>Welcome!</h1>
        <RecentlyAdded />
        <Recommended />
      </div>
    )
  }
}

export default Home
