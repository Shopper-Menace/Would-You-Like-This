import React, {useState} from 'react'

import {NavbarComp, Footer} from './components'
import Routes from './routes'

const App = props => {
  return (
    <div>
      <NavbarComp />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
