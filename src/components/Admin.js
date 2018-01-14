import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import NewCandidate from './NewCandidate'
import Result from './Result'

class Admin extends Component {
  render() {
    const { baseUrl } = this.props

    return (
      <Router basename={baseUrl}>
        <div>
          <ul>
            <li><Link to='/candidates/'>Add New Candidate</Link></li>
            <li><Link to='/results/'>Results</Link></li>
          </ul>
          <hr/>
          <Route path='/candidates/' component={NewCandidate} />
          <Route path='/results/' component={Result} />
        </div>
      </Router>
    )
  }
}

export default Admin
