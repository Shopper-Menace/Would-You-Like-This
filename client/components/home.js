import React, {Component} from 'react'
import RecentlyAdded from './recentlyAdded'
import Featured from './featured'

class Home extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="home">
        <h1>Welcome Buddy</h1>
        <RecentlyAdded />
        <Featured />
      </div>
    )
  }
}

export default Home
