import React, {Component} from 'react'
import RecentlyAdded from './recentlyAdded'
import Recommended from './recommended'
import Footer from './footer'

class Home extends Component {
  render() {
    console.log('INSIDE HOME')
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
