import React, { Component } from 'react'
import { Button, Container, Header, Item, Segment } from 'semantic-ui-react'
import firebase from '../firebase'

class Home extends Component {
  state = {
    votes: {},
    loading: true,
    isVoted: false,
  }

  resetVote = () => {
    const { votes } = this.state
    const candidates = Object.keys(votes)
    let initialVotes = {}
    candidates.forEach((candidate) => {
      let ref = firebase.database().ref(`votes/${candidate}`)
      ref.remove()
      ref.update({
        count: 0
      })
      initialVotes[candidate] = 0
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
    let refVotes = firebase.database().ref('votes')
    let initialVotes = {}
    refVotes.on('value', (snapshot) => {
      for (let candidate in snapshot.val()) {
        let ref = firebase.database().ref(`votes/${candidate}`)
        ref.once('value', (snapshot) => {
          let count = 0
          if (snapshot.val() !== null) {
            count = snapshot.val().count
          }
          initialVotes[candidate] = count
          this.setState({
            votes: initialVotes,
          })
        })
      }
      this.setState({
        loading: false,
      })
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
    const { votes } = this.state
    const candidates = Object.keys(votes)
    const items = candidates.map((candidate, i) => ((
      <Item
        key={i}
        style={{
          margin: '0.5em 0'
        }}
      >
        <Button
          key={i}
          size='massive'
          color={colors[i]}
          onClick={() => this.handleClick(candidate)}
          style={{
            minWidth: '300px'
          }}
          disabled={this.state.isVoted}>
          {candidate}
        </Button>
      </Item>
    )))

    return (
      <Container>
        <Segment>
          <Header as='h1'>Vote Your Hero!</Header>
          {this.state.loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <Button onClick={this.resetVote}>Reset Vote</Button>
              <Item.Group>{items}</Item.Group>
            </div>
          )}
        </Segment>
      </Container>
    )
  }
}

export default Home
