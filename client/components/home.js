import React, {Component} from 'react'
import RecentlyAdded from './recentlyAdded'
import Featured from './featured'

class Home extends Component {
  render() {
    return (
      <div className="home">
        <h1>Home</h1>
        <RecentlyAdded />
        <Featured />
      </div>
    )
  }
}

export default Home
