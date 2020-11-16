import React, {Component} from 'react'
import RecentlyAdded from './recentlyAdded'
import Recommended from './recommended'
import Featured from './featured'

class Home extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="home">
        <h1>Welcome, friends</h1>
        <RecentlyAdded />
        <Featured />
        <Recommended />
      </div>
    )
  }
}

export default Home
