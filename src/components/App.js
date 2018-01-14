import React, { Component } from 'react'
import Admin from './Admin'
import Home from './Home'

class App extends Component {
  render() {
    const baseUrl = '/vote-your-hero/'
    const currentPath = window.location.pathname

    return (
      <React.Fragment>
        {(
          currentPath === baseUrl ||
          currentPath === baseUrl.substr(0, baseUrl.length - 1) ||
          currentPath === '/'
        ) ? (
          <Home />
        ) : (
          <Admin baseUrl={baseUrl} />
        )}
      </React.Fragment>
    )
  }
}

export default App
