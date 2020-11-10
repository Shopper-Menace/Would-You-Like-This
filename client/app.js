import React from 'react'

import {NavbarComp, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <NavbarComp />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
