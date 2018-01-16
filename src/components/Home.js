import React, { Component } from 'react'
import {
  Button,
  Container,
  Header,
  Item,
  Segment
} from 'semantic-ui-react'
import firebase from '../firebase'

class Home extends Component {
  state = {
    candidates: [],
    isVoted: false,
    loading: true,
    myVoteKey: '',
    myVoteName: '',
  }

  handleClick = (candidate) => {
    let ref = firebase.database().ref(`items/${candidate.key}`)
    ref.transaction(c => ({
      name: c.name,
      count: c.count + 1,
    }))
    this.setState({
      isVoted: true,
      myVoteKey: candidate.key,
      myVoteName: candidate.name,
    })
  }

  getCandidate = (key) => (
    firebase.database().ref(`items/${key}`).once('value')
      .then(data => data.val())
  )

  cancelVote = () => {
    const { myVoteKey } = this.state
    this.getCandidate(myVoteKey).then(c => {
      let ref = firebase.database().ref(`items/${myVoteKey}`)
      ref.transaction(c => ({
        name: c.name,
        count: c.count - 1,
      }))
      this.setState({
        isVoted: false,
        myVoteKey: '',
        myVoteName: '',
      })
    })
  }

  componentDidMount() {
    firebase.database().ref('items').on('value', (data) => {
      const items = data.val();
      let candidates = [];
      let total = 0
      for (let key in items) {
        let item = items[key]
        item.key = key
        candidates.push(item)
        total += item.count
      }
      if(total === 0) {
        this.setState({
          isVoted: false,
          myVoteKey: '',
          myVoteName: '',
        })
      }
      this.setState({
        candidates,
        loading: false
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

    const {
      candidates,
      isVoted,
      loading,
      myVoteKey,
      myVoteName
    } = this.state
    const items = candidates.map((c, i) => ((
      <Item
        key={i}
        style={{
          margin: '0.5em 0'
        }}
      >
        <Button
          key={c.key}
          size='massive'
          color={colors[i]}
          onClick={() => this.handleClick(c)}
          style={{
            minWidth: '200px'
          }}
          disabled={isVoted}>
          {c.name}
        </Button>
      </Item>
    )))

    return (
      <Container>
        <Segment>
          <Header as='h1'>Vote Your Hero!</Header>
          {myVoteKey !== '' ? (
            <div>
              You've voted <strong>{myVoteName}</strong>. <Button size='mini' onClick={this.cancelVote}>Change your Mind?</Button>
            </div>
          ) : null}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <Item.Group>{items}</Item.Group>
            </div>
          )}
        </Segment>
      </Container>
    )
  }
}

export default Home
