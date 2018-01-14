import React, { Component } from 'react'
import { Button, Container, Header, Item, Segment } from 'semantic-ui-react'
import firebase from '../firebase'

class Home extends Component {
  state = {
    candidates: [],
    isVoted: false,
    loading: true,
  }

  handleClick = (candidate) => {
    candidate.count++
    firebase.database().ref(`items/${candidate.key}`).set({
      name: candidate.name,
      count: candidate.count,
    })
    this.setState({
      isVoted: true,
    })
  }

  componentDidMount() {
    firebase.database().ref('items').on('value', (data) => {
      const items = data.val();
      let candidates = [];
      for (let key in items) {
        let item = items[key]
        item.key = key
        candidates.push(item)
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

    const { candidates, isVoted, loading } = this.state
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
