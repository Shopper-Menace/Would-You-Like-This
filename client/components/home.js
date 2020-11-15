import React, {Component} from 'react'
import RecentlyAdded from './recentlyAdded'
import Recommended from './recommended'

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome!</h1>
      <RecentlyAdded />
      <Recommended />
    </div>
  )
}

export default Home
