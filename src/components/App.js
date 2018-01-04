import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './Home'
import NewCandidate from './NewCandidate'
import Result from './Result'

class App extends Component {
  render() {
    const baseUrl = '/vote-your-hero'

    return (
      <Router>
        <div>
          <ul>
            <li><Link to={baseUrl + '/'}>Home</Link></li>
            <li><Link to={baseUrl + '/candidates/'}>Add New Candidate</Link></li>
            <li><Link to={baseUrl + '/results/'}>Results</Link></li>
          </ul>
          <hr/>
          <Route exact path={baseUrl + '/'} component={Home} />
          <Route path={baseUrl + '/candidates/'} component={NewCandidate} />
          <Route path={baseUrl + '/results/'} component={Result} />
        </div>
      </Router>
    )
  }
}

export default App
