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
      <Router basename={baseUrl}>
        <div>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/candidates/'>Add New Candidate</Link></li>
            <li><Link to='/results/'>Results</Link></li>
          </ul>
          <hr/>
          <Route exact path='/' component={Home} />
          <Route path='/candidates/' component={NewCandidate} />
          <Route path='/results/' component={Result} />
        </div>
      </Router>
    )
  }
}

export default App
