import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Button, Container, Header, Item } from 'semantic-ui-react'
import firebase from '../firebase'
import NewCandidate from './NewCandidate'

class Main extends Component {
  state = {
    votes: {},
    loading: true,
    isVoted: false,
    candidates: [
      'Kan',
      'Cory',
      'Mils',
      'Natty',
    ],
  }

  resetVote = () => {
    const { candidates } = this.state
    let initialVotes = {}
    candidates.forEach((c) => {
      let ref = firebase.database().ref(`votes/${c}`)
      ref.remove()
      ref.update({
        count: 0
      })
      initialVotes[c] = 0
    })
    this.setState({
      votes: initialVotes,
      isVoted: false,
    })
  }

  handleClick = (candidate) => {
    const ref = firebase.database().ref(`votes/${candidate}`)
    ref.once('value', (snapshot) => {
      const count = snapshot.val().count
      ref.update({
        count: count + 1
      })
      this.setState({
        count: count + 1,
        //isVoted: true,
      })
    })
  }

  componentDidMount() {
    const { candidates } = this.state
    let initialVotes = {}
    candidates.forEach((c) => {
      let ref = firebase.database().ref(`votes/${c}`)
      ref.once('value', (snapshot) => {
        let count = 0
        if (snapshot.val() !== null) {
          count = snapshot.val().count
        }
        initialVotes[c] = count
        console.log(initialVotes)
        this.setState({
          votes: initialVotes,
        })
      })
    })
    this.setState({
      loading: false,
    })
  }

  render() {
    const colors = [
      'red',
      'orange',
      'yellow',
      'olive',
      'green',
      'teal',
      'blue',
      'violet',
      'purple',
      'pink',
      'brown',
      'grey',
      'black',
      'facebook',
      'google plus',
      'instagram',
      'linkedin',
      'twitter',
      'vk',
      'youtube',
    ]
    const { candidates } = this.state
    const items = candidates.map((c, i) => ({
        childKey: i + 1,
        children: <Button
          size='massive'
          color={colors[i]}
          onClick={() => this.handleClick(c)}
          disabled={this.state.isVoted}>
          {c}
        </Button>
      })
    )

    return (
      <Container>
        <Header as='h1'>Vote Your Hero!</Header>
        <div>{ (this.state.loading ) ? 'Loading...' : this.state.count }</div>
        <Button onClick={this.resetVote}>Reset</Button>
        <Item.Group items={items} />
      </Container>
    )
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/candidates/">Candidates</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Main}/>
          <Route path="/candidates/" component={NewCandidate}/>
        </div>
      </Router>
    )
  }
}

export default App
