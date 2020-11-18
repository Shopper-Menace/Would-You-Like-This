import React, {Component} from 'react'
import RecentlyAdded from './recentlyAdded'
import Featured from './featured'

class Home extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="home">
        <div>
          <RecentlyAdded />
          <Featured />
        </div>
      </div>
    )
  }
}

export default Home
